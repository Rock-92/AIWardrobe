# Prompt

这个目录放“生成 prompt 相关”的模板和流程代码，包括需求解析、偏好抽取、RAG 样例匹配、最终推荐 prompt 组装。

- `inspiration_mode_v1.md`: 输入审核、需求解析、凭空推荐生成、输出自检、最终回复的完整 prompt 工作流。
- `build_example_embeddings.js`: 为 `Dataset/Description_example.json` 生成 RAG embedding 索引。

数据约定：

- 样例图片目录：`Dataset/data_example`
- 样例描述文件：`Dataset/Description_example.json`
- 样例向量索引：`Dataset/example_embeddings.json`
- 用户资料：`Dataset/users.json`
- 用户历史对话：`Dataset/chat_history.json`
- 样例编号：`sample-0001` 起
- 凭空推荐单品编号：`insp-*`

后续接 RAG 时，`intent_parse_prompt` 输出的 `retrieval_query` 用于 embedding 检索，检索结果填入 `inspiration_generate_prompt` 的 `retrieved_examples`。

生成样例向量索引：

```bash
node prompt/build_example_embeddings.js
```
