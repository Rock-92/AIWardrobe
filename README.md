# AIWardrobe 对话样本

这是本地原型：网页展示“用户资料 -> 对话需求 -> LLM 需求解析/偏好抽取 -> 机械审核 -> RAG 样例检索 -> 推荐结果/校验摘要”的流程。

运行：

```bash
node server.js
```

打开：

```text
http://127.0.0.1:4173
```

当前用户资料和历史对话仍会在浏览器 localStorage 中运行时保存；`Dataset/users.json` 和 `Dataset/chat_history.json` 是未来迁移到真实数据库前的数据结构样例。

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

index.html                     # 前端页面结构
styles.css                     # 前端样式
app.js                         # 前端交互、用户资料、审核门控、RAG 调用
server.js                      # 本地服务和 OpenAI API 代理
流程.md                         # 项目路线记录
```

生成 RAG 向量索引：

```bash
node prompt/build_example_embeddings.js
```

现在可以试：

- 切换 `用户1` / `用户2`，观察每个用户的衣柜和历史不同。
- 新建用户、重命名用户、清空历史。
- 在左侧把城市、温度、天气、场合、心情保留为 `无`，也可以手动选择。
- 在中间对话框输入需求，例如：`今天小雨，晚上约会，想轻松一点但不要太随便。`
- 查看右侧历史偏好、匹配样例、校验结果和模型输入摘要。
