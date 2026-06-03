import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = ROOT / ".env"
DEFAULT_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1"


def load_env(path):
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        clean = line.strip()
        if not clean or clean.startswith("#") or "=" not in clean:
            continue
        key, value = clean.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def mask_key(value):
    if not value:
        return "未配置"
    if len(value) <= 10:
        return "***"
    return f"{value[:6]}...{value[-4:]}"


def dashscope_url(route):
    base = os.getenv("DASHSCOPE_BASE_URL", DEFAULT_BASE_URL).rstrip("/")
    return f"{base}{route}"


def request_json(route, payload, timeout):
    api_key = os.getenv("DASHSCOPE_API_KEY", "").strip()
    if not api_key or "请替换" in api_key:
        raise RuntimeError("DASHSCOPE_API_KEY 未配置，请先填写项目 .env")

    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        dashscope_url(route),
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
    )

    start = time.perf_counter()
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            raw = response.read().decode("utf-8")
            elapsed = time.perf_counter() - start
            return json.loads(raw), elapsed
    except urllib.error.HTTPError as error:
        raw = error.read().decode("utf-8", errors="replace")
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = raw
        raise RuntimeError(f"HTTP {error.code}: {payload}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"网络请求失败: {error.reason}") from error


def extract_chat_text(payload):
    choices = payload.get("choices") or []
    if choices:
        message = choices[0].get("message") or {}
        content = message.get("content")
        if isinstance(content, str):
            return content
    return json.dumps(payload, ensure_ascii=False, indent=2)


def print_header(title):
    print(f"\n== {title} ==")


def run_status(_args):
    print_header("配置")
    print(f"项目目录: {ROOT}")
    print(f".env: {'存在' if ENV_PATH.exists() else '不存在'}")
    print(f"DASHSCOPE_API_KEY: {mask_key(os.getenv('DASHSCOPE_API_KEY', ''))}")
    print(f"DASHSCOPE_BASE_URL: {os.getenv('DASHSCOPE_BASE_URL', DEFAULT_BASE_URL)}")
    print(f"QWEN_MODEL: {os.getenv('QWEN_MODEL', 'qwen-plus')}")
    print(f"QWEN_CHECK_MODEL: {os.getenv('QWEN_CHECK_MODEL', os.getenv('QWEN_MODEL', 'qwen-plus'))}")
    print(f"QWEN_ANALYSIS_MODEL: {os.getenv('QWEN_ANALYSIS_MODEL', os.getenv('QWEN_MODEL', 'qwen-plus'))}")
    print(f"QWEN_GENERATION_MODEL: {os.getenv('QWEN_GENERATION_MODEL', os.getenv('QWEN_MODEL', 'qwen-plus'))}")
    print(f"DASHSCOPE_EMBEDDING_MODEL: {os.getenv('DASHSCOPE_EMBEDDING_MODEL', 'text-embedding-v4')}")


def run_chat(args):
    model = args.model or os.getenv("QWEN_CHECK_MODEL", os.getenv("QWEN_MODEL", "qwen-plus"))
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "你只用一句中文回答。"},
            {"role": "user", "content": args.message},
        ],
        "temperature": 0,
    }
    print_header("Chat")
    data, elapsed = request_json("/chat/completions", payload, args.timeout)
    print(f"model: {model}")
    print(f"elapsed: {elapsed:.2f}s")
    print(extract_chat_text(data))


def run_embedding(args):
    model = args.model or os.getenv("DASHSCOPE_EMBEDDING_MODEL", "text-embedding-v4")
    payload = {
        "model": model,
        "input": args.text,
        "encoding_format": "float",
    }
    print_header("Embedding")
    data, elapsed = request_json("/embeddings", payload, args.timeout)
    vector = ((data.get("data") or [{}])[0]).get("embedding") or []
    print(f"model: {model}")
    print(f"elapsed: {elapsed:.2f}s")
    print(f"dimensions: {len(vector)}")
    print(f"first_values: {vector[:5]}")


def run_analyze(args):
    model = args.model or os.getenv("QWEN_CHECK_MODEL", os.getenv("QWEN_ANALYSIS_MODEL", os.getenv("QWEN_MODEL", "qwen-plus")))
    schema_hint = {
        "guard": {
            "safe": True,
            "risk_types": [],
            "sanitized_input": args.message,
            "blocked_reason": None,
        },
        "intent": {
            "mode": "closet",
            "occasion": "约会",
            "weather": "小雨",
            "style_keywords": ["松弛", "精致"],
            "retrieval_query": "小雨 晚上 约会 松弛 精致 穿搭",
            "needs_clarification": False,
            "clarifying_question": "",
        },
        "preference_delta": {
            "likes": [],
            "dislikes": [],
            "contextual_preferences": [],
            "do_not_store": [],
            "summary": "",
        },
    }
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": "你是 AI 衣柜的需求解析器。必须只输出 JSON，不要 Markdown。",
            },
            {
                "role": "user",
                "content": (
                    "请把用户穿搭需求解析成 JSON，字段结构参考："
                    f"{json.dumps(schema_hint, ensure_ascii=False)}\n"
                    f"用户需求：{args.message}"
                ),
            },
        ],
        "temperature": 0,
        "response_format": {"type": "json_object"},
    }
    print_header("Analyze")
    data, elapsed = request_json("/chat/completions", payload, args.timeout)
    text = extract_chat_text(data)
    print(f"model: {model}")
    print(f"elapsed: {elapsed:.2f}s")
    try:
        parsed = json.loads(text)
        print(json.dumps(parsed, ensure_ascii=False, indent=2))
    except json.JSONDecodeError:
        print(text)


def run_all(args):
    run_status(args)
    run_chat(args)
    embedding_args = argparse.Namespace(**vars(args))
    embedding_args.model = None
    run_embedding(embedding_args)
    run_analyze(args)


def build_parser():
    parser = argparse.ArgumentParser(description="Fast DashScope/Qwen probes for AIWardrobe.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    status = subparsers.add_parser("status", help="Print local Qwen configuration.")
    status.add_argument("--timeout", type=float, default=12, help=argparse.SUPPRESS)
    status.set_defaults(func=run_status)

    chat = subparsers.add_parser("chat", help="Call Qwen chat completions.")
    chat.add_argument("--message", default="你是谁？")
    chat.add_argument("--model")
    chat.add_argument("--timeout", type=float, default=12, help="HTTP timeout in seconds.")
    chat.set_defaults(func=run_chat)

    embedding = subparsers.add_parser("embedding", help="Call DashScope embeddings.")
    embedding.add_argument("--text", default="小雨天的松弛精致约会穿搭")
    embedding.add_argument("--model")
    embedding.add_argument("--timeout", type=float, default=12, help="HTTP timeout in seconds.")
    embedding.set_defaults(func=run_embedding)

    analyze = subparsers.add_parser("analyze", help="Ask Qwen for wardrobe intent JSON.")
    analyze.add_argument("--message", default="今天小雨，晚上约会，想松弛但精致。")
    analyze.add_argument("--model")
    analyze.add_argument("--timeout", type=float, default=12, help="HTTP timeout in seconds.")
    analyze.set_defaults(func=run_analyze)

    all_checks = subparsers.add_parser("all", help="Run status, chat, embedding, and analyze.")
    all_checks.add_argument("--message", default="今天小雨，晚上约会，想松弛但精致。")
    all_checks.add_argument("--model")
    all_checks.add_argument("--text", default="小雨天的松弛精致约会穿搭")
    all_checks.add_argument("--timeout", type=float, default=12, help="HTTP timeout in seconds.")
    all_checks.set_defaults(func=run_all)

    return parser


def main():
    load_env(ENV_PATH)
    parser = build_parser()
    args = parser.parse_args()
    try:
        args.func(args)
    except Exception as error:
        print(f"错误: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
