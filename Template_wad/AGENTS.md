# Repository Guidelines

## Project Structure & Module Organization
- `main.tex`: 人工智能课程报告模板入口；按章节组织内容并保持占位示例便于复用。
- `applemlr.cls`: 自定义文档类，统一无衬线中文排版；修改前先与助教沟通。
- `math_commands.tex`: 公共数学宏定义文件，新增符号请集中维护，避免正文重复定义。
- `figures/`: 存放插图与示意图，优先提交 PDF 或 300dpi PNG，并与 `\label{fig:...}` 命名一致。
- `store/`: 提供 SF Pro 字体与示例脚本；除非更新许可，不要替换字体资源。
- `ref.bib`: 单一参考文献库，所有引用统一在此维护。

## Build, Test, and Development Commands
- `xelatex -halt-on-error main.tex`: 首次编译，立即暴露语法与缺字错误。
- `bibtex main`: 更新 `ref.bib` 后运行，生成最新参考文献列表。
- `xelatex main.tex` ×2: 重新编译以刷新目录、交叉引用与页码。
- `latexmk -xelatex -interaction=nonstopmode main.tex`: 持续监听文件并自动构建，适合写作过程。
- `latexmk -c`: 清理辅助文件，确保仓库保持精简。

## Coding Style & Naming Conventions
- 环境内部统一使用两个空格缩进，并尽量做到“一句一行”以减少 merge 冲突。
- 新宏或算符集中写入 `math_commands.tex`，采用驼峰命名，如 `\newcommand{\dataSplit}{...}`。
- 新引入的 `\usepackage` 按字母排序，带可选参数时与宏包同一行。
- 图表、公式的 `\label{}` 紧贴 `\caption{}` 或目标公式所在行。

## Testing Guidelines
- 以无警告的 `latexmk -xelatex main.tex` 作为提交前基准。
- 每次修改引用后执行 `bibtex main` 并再次双编译，确认无 “undefined citation” 提示。
- 手动检查输出 PDF：重点确认中文字体加载、图表清晰度及分页是否合理。

## Commit & Pull Request Guidelines
- 采用 Conventional Commits（如 `docs:`, `feat:`, `fix:`），简洁描述主要变更，例如 `docs: refine methodology template`。
- 单次提交聚焦同一章节或功能，避免大规模混合修改。
- PR 描述需列出受影响章节、是否新增宏或资源、测试命令结果，并附上 PDF 截图展示主要版式变化。

## Fonts & Asset Tips
- 确认本地已安装至少一种无衬线 CJK 字体（`Noto Sans CJK SC`、`Source Han Sans SC` 或 `PingFang SC`）。
- 添加大体积图片或数据前，请压缩或放入外部存储再引用下载链接。
- 若新增顶层 TeX 入口文件，记得同步更新 `00README.json` 以便自动化构建识别。
