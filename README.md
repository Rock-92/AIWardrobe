# AIWardrobe 对话样本

这是本地原型：网页展示“用户资料 -> 对话需求 -> LLM 需求解析/偏好抽取 -> 机械审核 -> RAG 样例检索 -> 千问生成搭配 -> 编号校验摘要”的流程。

运行：

```bash
node server.js
```

Windows 也可以直接双击：

```text
start-aiwardrobe.bat
```

启动脚本会先检查 `Dataset/example_embeddings.json`。如果 RAG 向量索引不存在，或 `Description_example.json` 比索引更新，会自动用 `text-embedding-v4` 重新生成索引，再打开网页。

打开：

```text
http://127.0.0.1:4173
```

当前用户资料和历史对话仍会在浏览器 localStorage 中运行时保存；`Dataset/users.json` 和 `Dataset/chat_history.json` 是未来迁移到真实数据库前的数据结构样例。

## 千问 API

在项目根目录创建 `.env`，填入阿里云百炼 API Key：

```text
DASHSCOPE_API_KEY=sk-你的Key
QWEN_MODEL=qwen-plus
QWEN_CHECK_MODEL=qwen-plus
QWEN_ANALYSIS_MODEL=qwen3.7-plus
QWEN_GENERATION_MODEL=qwen3.7-plus
DASHSCOPE_EMBEDDING_MODEL=text-embedding-v4
```

`server.js` 使用阿里云百炼兼容模式调用千问：

- `/api/analyze-message`：解析用户需求、审核输入、抽取偏好。
- `/api/retrieve-examples`：用 `Dataset/example_embeddings.json` 做向量检索；没有索引时自动退回关键词检索。
- `/api/generate-outfits`：把前端条件、当前用户衣柜、历史偏好和 RAG 检索样例交给千问生成穿搭。

如果 API Key 未配置或 API 调用失败，前端会保留本地规则降级，方便课堂演示不中断。

不要直接双击 `index.html` 来验证千问 API。浏览器直开页面无法可靠携带 `Authorization` 调用阿里云接口，也不能自动写入 `.env`。请通过 `start-aiwardrobe.bat` 或 `node server.js` 打开页面，再点顶部的“检测”按钮。

顶部“检测”按钮现在走快速链路：`/api/quick-check` 只验证本地服务、`QWEN_CHECK_MODEL`、向量模型和 RAG 索引状态，不再等待完整需求解析和搭配生成。正式推荐仍使用 `QWEN_ANALYSIS_MODEL` 和 `QWEN_GENERATION_MODEL`。

快速验证千问可用性时，可以先跑轻量脚本，不必等待页面完整检测链：

```bash
python qwen_tools/qwen_probe.py status
python qwen_tools/qwen_probe.py chat
python qwen_tools/qwen_probe.py embedding
python qwen_tools/qwen_probe.py analyze --message "今天小雨，晚上约会，想松弛但精致。"
python qwen_tools/qwen_probe.py all
```

Windows 也可以双击 `qwen_tools/run_all_checks.bat`。这些脚本直接读取项目 `.env`，用于快速判断 Key、聊天模型、向量模型和需求解析是否可用。

默认快测会使用 `QWEN_CHECK_MODEL`。如果想专门看强模型输出，可以显式指定模型并放宽超时：

```bash
python qwen_tools/qwen_probe.py analyze --model qwen3.7-plus --timeout 30
```

## 项目结构

```text
Dataset/
  data_example/                # 统一编号后的穿搭样例图片
  Description_example.json     # 样例图片描述
  example_embeddings.json      # 生成后出现，RAG 向量索引
  users.json                   # 用户资料数据样例
  chat_history.json            # 用户历史对话数据样例

prompt/
  inspiration_mode_v1.md       # Prompt 工作流模板
  build_example_embeddings.js  # 生成 example_embeddings.json
  README.md                    # prompt/RAG 说明

qwen_tools/
  qwen_probe.py                # 快速验证千问 chat、embedding、analysis
  run_all_checks.bat           # Windows 双击运行全部快速检测

index.html                     # 前端页面结构
styles.css                     # 前端样式
app.js                         # 前端交互、用户资料、审核门控、RAG 调用
server.js                      # 本地服务和千问 API 代理
流程.md                         # 项目路线记录
```

手动生成 RAG 向量索引：

```bash
node prompt/build_example_embeddings.js
```

生成后会出现 `Dataset/example_embeddings.json`，搜索阶段会从关键词匹配升级为 embedding 相似度检索。

现在可以试：

- 切换 `用户1` / `用户2`，观察每个用户的衣柜和历史不同。
- 新建用户、重命名用户、清空历史。
- 在左侧把城市、温度、天气、场合、心情保留为 `无`，也可以手动选择。
- 在中间对话框输入需求，例如：`今天小雨，晚上约会，想轻松一点但不要太随便。`
- 查看右侧历史偏好、匹配样例、校验结果和模型输入摘要。
