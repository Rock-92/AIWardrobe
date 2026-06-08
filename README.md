# AIWardrobe 本地原型

AIWardrobe 是一个对话式 AI 智能衣柜原型。当前版本已经串联了用户资料、需求输入、衣柜管理、RAG 样例检索、千问穿搭生成、历史偏好记忆、结果校验和万相穿搭效果图生成。

当前项目仍以本地 Web 原型为主，用户历史对话、长期偏好和衣柜数据会保存到后端本地文件 `Dataset/local_db.json`。用户上传衣物图会保存到 `UploadedWardrobeImages/`，模型生成的衣物图会保存到 `GeneratedWardrobeImages/`。

## 快速启动

在项目根目录运行：

```bash
node server.js
```

Windows 也可以双击：

```text
start-aiwardrobe.bat
```

启动脚本会检查 `Dataset/example_embeddings.json`。如果 RAG 向量索引不存在，或 `Dataset/Description_example.json` 比索引更新，会自动调用 `prompt/build_example_embeddings.js` 重新生成索引。

打开页面：

```text
http://127.0.0.1:4173
```

不要直接双击 `index.html` 验证 API。请通过 `node server.js` 或 `start-aiwardrobe.bat` 打开页面。

## API 配置

在项目根目录创建 `.env`，填入阿里云百炼 API Key：

```text
DASHSCOPE_API_KEY=sk-你的Key
QWEN_MODEL=qwen-plus
QWEN_CHECK_MODEL=qwen-plus
QWEN_ANALYSIS_MODEL=qwen3.7-plus
QWEN_GENERATION_MODEL=qwen3.7-plus
QWEN_IMAGE_ONLY_MODEL=qwen-plus
DASHSCOPE_EMBEDDING_MODEL=text-embedding-v4
WAN_IMAGE_MODEL=wan2.7-image-pro
WAN_IMAGE_SIZE=2K
WAN_WARDROBE_IMAGE_SIZE=1024*1024
```

主要接口：

- `/api/quick-check`：检测本地服务、模型配置和 RAG 索引状态。
- `/api/analyze-message`：审核输入、解析需求、抽取偏好增量。
- `/api/retrieve-examples`：检索 `sample-*` 穿搭样例。
- `/api/generate-outfits`：生成三套穿搭方案。
- `/api/analyze-wardrobe-item`：根据衣物名称或图片生成衣物描述/示意图。
- `/api/visualize-outfit`：生成穿搭上身效果图。
- `/api/delete-generated-wardrobe-image`：删除模型生成的本地衣物图。

如果 API Key 未配置或 API 调用失败，部分流程会使用本地规则兜底，方便课堂演示不中断。

## 当前功能

### 用户与需求

- 多用户切换、新建、重命名、删除。
- 用户资料包含性别、偏好风格、偏好单品、偏好颜色。
- 需求区支持身高、体型、年龄、天气、场合、心情和推荐边界。
- 需求信息会进入推荐生成、RAG 检索和穿搭效果图 prompt。

### 衣柜管理

- 支持搜索衣物编号或名称。
- 支持添加、编辑、删除衣物。
- 删除衣物前会弹出确认框，格式为 `#编号-名称`。
- 只有名称时，系统会生成衣物描述和单品示意图。
- 只有图片时，系统会识别衣物特征并生成描述。
- 名称和图片都有时，优先保留用户图片，并结合名称生成描述。
- 模型生成的衣物图会保存到 `GeneratedWardrobeImages`。
- 删除模型生成衣物时，会同步删除本地生成图；用户本地上传图不会被额外删除。

### 衣物图片生成

单件衣物示意图 prompt 当前要求：

- 背景必须是纯白色 `#FFFFFF`。
- 不出现灰墙、桌面、地面、阴影、渐变、纹理、环境物体或装饰。
- 只展示单件衣物，不出现真人模特。
- 不添加文字、水印或品牌标志。

### 历史偏好

历史偏好来自模型解析出的 `preference_delta`，包括 `likes`、`dislikes` 和场景化偏好。

当前规则：

- 只有安全审核和机械审核通过后才写入偏好记忆。
- 偏好按关键词本身去重，不再按 `type + value` 去重。
- 新旧偏好重复时，只保留置信度更高的一条。
- 右侧“历史偏好”优先展示模型抽取出的动态关键词。
- 固定词表只作为兜底。
- 高频词优先展示；出现次数大于等于 2 次的词排在前面。
- 如果高频词不足，会补充少量模型最近抽取的一次性关键词，避免偏好区过空。
- 最多展示 8 个偏好词。
- 标签只展示词本身，不再显示 `×次数`。
- 删除偏好会真正从 `likes`、`dislikes`、`contextual_preferences` 中移除，不再写入隐藏 buffer。
- 如果展示词来自长词片段，例如 `正式` 来自 `正式但不失轻松`，删除 `正式` 会一并移除对应长词。

### RAG 和证据区

- 使用 `retrieval_query` 检索 `Dataset/example_embeddings.json`。
- 没有向量索引时，会退回关键词检索。
- 右侧显示历史偏好、匹配样例、校验结果和模型输入摘要。
- 匹配样例只在生成搭配后展示。
- 样例以 `sample-*` 编号显示，并支持图片预览。
- RAG 样例只作为风格、配色和场景参考，不能当作用户衣柜中的真实衣物。

### 穿搭生成与校验

- 千问生成三套穿搭方案。
- 前端会校验输出衣物编号和规则一致性。
- 衣柜模式优先使用当前用户真实衣柜。
- 灵感单品需要与衣柜单品区分。
- API 失败或输出不合格时，会尽量使用本地规则兜底。

### 穿搭效果图

用户生成推荐后，可以点击“看看搭配上身”，选择方案调用万相生成虚拟模特效果图。

当前效果图 prompt 约束：

- 优先参考用户衣柜中的衣物图片。
- 没有参考图的单品按名称、描述和方案风格生成。
- 必须展示搭配中的上半身、下半身以及鞋包等配件。
- 帽子判断只看实际搭配单品的名称/类别中是否有“帽”；连帽卫衣、连帽夹克不算帽子，挎包、斜挎包、托特包、背包、小肩包等包类也不算帽子。
- 如果搭配中没有帽子元素，图像必须按 `neck-to-feet outfit crop` 生成：画面从脖子开始裁切，只裁掉头部，必须显式显示完整左右双肩和肩线，不包含头部、脸部、五官、耳朵或头发。
- 没有帽子元素时，必须显示完整上半身、完整下半身、双脚和鞋子；不允许从胸口、腰部、大腿或膝盖处裁剪，也不允许生成露脸全身图。
- 如果搭配中有帽子元素，图像必须显示完整全身和完整穿搭，包括帽子、上半身、下半身和鞋子。
- 有帽子元素时，脸部信息可以根据整体风格自然生成，但要协调、真实、干净，不要突兀、变形或难看。
- 参考衣物图只用于提取颜色、材质、轮廓和细节，不允许照搬参考图的半身、腰部局部、腿部局部或商品裁剪构图。
- 不生成用户本人，不添加品牌标志或文字水印。
- 生成图仅作为 AI preview，不代表真实试穿结果。

## 项目结构

```text
Clothes/                         # 衣物素材
Dataset/
  data_example/                  # 穿搭样例图片
  Description_example.json       # 样例图片描述
  example_embeddings.json        # RAG 向量索引
  users.json                     # 用户资料数据样例
  chat_history.json              # 历史对话数据样例
GeneratedWardrobeImages/         # 模型生成的衣物图
prompt/
  build_example_embeddings.js    # 生成 example_embeddings.json
  README.md                      # prompt/RAG 说明
qwen_tools/
  qwen_probe.py                  # 快速验证模型和 embedding
  run_all_checks.bat             # Windows 快速检测脚本

index.html                       # 前端页面结构
styles.css                       # 前端样式
app.js                           # 前端状态、交互、校验、RAG 调用
server.js                        # 本地服务、千问/万相 API 代理
start-aiwardrobe.bat             # Windows 启动脚本
流程.md                           # 当前流程说明
项目进度汇总.docx                  # 当前项目进度汇总
```

## 手动生成 RAG 索引

```bash
node prompt/build_example_embeddings.js
```

生成后会出现：

```text
Dataset/example_embeddings.json
```

## 快速验证千问能力

```bash
python qwen_tools/qwen_probe.py status
python qwen_tools/qwen_probe.py chat
python qwen_tools/qwen_probe.py embedding
python qwen_tools/qwen_probe.py analyze --message "今天小雨，晚上约会，想松弛但精致。"
python qwen_tools/qwen_probe.py all
```

Windows 也可以双击：

```text
qwen_tools/run_all_checks.bat
```

## 演示建议

1. 启动 `node server.js`。
2. 打开 `http://127.0.0.1:4173`。
3. 点击顶部“检测”，确认 API 和 RAG 状态。
4. 选择或新建用户。
5. 填写身高、体型、年龄、天气、场合、心情。
6. 在衣柜中添加或编辑几件衣服。
7. 输入需求，例如：`今天小雨，晚上约会，想轻松一点但不要太随便。`
8. 查看右侧历史偏好、匹配样例、校验结果和模型输入摘要。
9. 点击“看看搭配上身”，选择方案生成虚拟模特效果图。

## 当前限制与下一步

- 当前用户状态保存在后端本地文件 `Dataset/local_db.json`；迁移设备时需要同时迁移该文件以及 `UploadedWardrobeImages/`、`GeneratedWardrobeImages/` 中的图片。
- 需要引入本地数据库，统一保存用户、衣柜、偏好、历史和生成图索引。
- 需要补充固定评测集，覆盖天气、场合、偏好冲突、衣柜缺失、跨用户隔离等案例。
- 需要继续强化 validator，支持模型输出不合格后的自动重试。
- 需要补充 API 调用日志、耗时、失败原因和成本统计。
- 需要继续完善隐私数据导出、删除和隔离策略。
