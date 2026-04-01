# 长时间运行的代理工作流程

当任务可能跨越多个会话、切换或派生代理时，请使用此剧本。

## 目标

- 为每个新会话提供一种快速方法来重新获得上下文
- 保持工作增量，而不是一次性进行大的更改
- 在添加更多代码之前捕获损坏的本地基线
- 留下下一个会话可以信任的持久工件

## 保存状态的位置

- 当人员、审核机器人或多个工具链需要相同的任务状态时使用 `docs/agent-runs/<slug>/`。
- 仅当任务状态有意位于一个工作站本地时才使用工具本地目录，例如 `.codex/runs/<slug>/`或一个工具链。
- 如果其他贡献者或代理稍后需要，请勿在私有临时文件中隐藏多会话共享状态。

## 所需文件

在长时间运行的任务开始时创建这些文件：

- `feature-list.json`
- `progress.md`

使用 `docs/agent-playbooks/templates/feature-list.template.json` 和 `docs/agent-playbooks/templates/progress.template.md` 中的模板。

优先选择 JSON 作为功能列表，这样客服人员可以更新少量字段，而无需重写整个文档。

## 会话开始检查表

1. 运行 `pwd`。
2. 读取 `progress.md`。
3. 读取 `feature-list.json`。
4. 运行 `git log --oneline -20`。
5. 运行 `./scripts/agent-init.sh --smoke`。
6. 准确选择一个最高优先级的项目，该项目仍然是 `pending`， `in_progress` 或 `blocked`。

如果冒烟步骤失败，请在实现新功能切片之前修复损坏的基线。

## 会话规则

- 一次处理一个功能或任务切片。
- 保持功能列表机器可读且稳定。更新状态、注释、文件和验证字段，而不是重写不相关的项目。
- 仅在运行该项目中列出的命令或用户流程后标记已验证的项目。
- 将生成的代理用于有界切片，而不是整体任务状态所有权。
- 当子代理拥有一项时，为其提供确切的项 ID、接受标准以及它可能接触的文件。

## 会话结束检查表

1. 向 `progress.md` 附加一个简短的进度条目。
2. 更新 `feature-list.json` 中的接触项。
3. 记录运行的确切命令以进行验证。
4. 捕获阻碍、后续操作以及要恢复的下一个最佳项目。

## 推荐的进度条目形状

使用简短的结构，例如：

```markdown
## 2026-03-17 14:30

- Item: F003
- Summary: Updated the browser-check flow to use the shared init/bootstrap path.
- Files: `.cursor/agents/browser-check.md`, `.codex/agents/browser-check.toml`
- Verification: `corepack yarn build`, `corepack yarn lint`, `corepack yarn typecheck`
- Next: Run the smoke flow and update the task-board status.
```
