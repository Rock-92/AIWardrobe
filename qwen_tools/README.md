# Qwen quick probes

This folder contains small scripts for checking DashScope/Qwen availability without running the full web app.

The scripts read `../.env` automatically and avoid printing the full API key.
By default, quick chat/analyze probes use `QWEN_CHECK_MODEL` so checks stay fast. Use `--model qwen3.7-plus --timeout 30` when you want to inspect the stronger production model.

## Common commands

```powershell
python .\qwen_tools\qwen_probe.py status
python .\qwen_tools\qwen_probe.py chat
python .\qwen_tools\qwen_probe.py embedding
python .\qwen_tools\qwen_probe.py analyze --message "今天小雨，晚上约会，想松弛但精致。"
python .\qwen_tools\qwen_probe.py all
python .\qwen_tools\qwen_probe.py analyze --model qwen3.7-plus --timeout 30
```

## Why use this

The page's "检测" button runs the whole local chain:

`/api/status -> /api/analyze-message -> /api/retrieve-examples -> /api/generate-outfits`

That is useful for end-to-end verification, but slow when debugging. These probes call Qwen directly so you can quickly tell whether the API key, chat model, and embedding model are usable.
