# 已知的意外

此文件跟踪导致代理错误的特定于存储库的混淆点。

## 条目标准

仅在全部为真时添加条目：

- 它特定于此存储库（不是通用建议）。
- 未来的代理可能会再次出现这种情况。
- 它有一个可以遵循的具体缓解措施。

如果不确定，请在添加条目之前询问开发人员。

## 条目模板

```md
### [Short title]

- **Date:** YYYY-MM-DD
- **Observed by:** agent name or contributor
- **Context:** where/when it happened
- **What was surprising:** concrete unexpected behavior
- **Impact:** what went wrong or could go wrong
- **Mitigation:** exact step future agents should take
- **Status:** confirmed | superseded
```

## 条目

### Portless 更改了规范的本地应用 URL

- **日期：** 2026-03-18
- **观察者：** Codex
- **上下文：**浏览器验证和烟雾流
- **令人惊讶的是：**默认的本地 URL 不是通常的 Vite 端口。该存储库期望通过 Portless 实现 `http://bitsocial.localhost:1355`，因此检查 `localhost:3000` 或 `localhost:5173` 可能会命中错误的应用程序或根本无法命中任何内容。
- **影响：** 即使开发服务器运行状况良好，浏览器检查也可能失败或验证错误的目标。
- **缓解：** 首先使用 `http://bitsocial.localhost:1355`。仅当您明确需要直接 Vite 端口时，才使用 `PORTLESS=0 corepack yarn start` 绕过它。
- **状态：**已确认

### Commitizen 挂钩会阻止非交互式提交

- **日期：** 2026-03-18
- **观察者：** Codex
- **上下文：** 代理驱动的提交工作流程
- **令人惊讶的是：** `git commit` 通过 Husky 触发 Commitizen 并等待交互式 TTY 输入，这会挂起非交互式代理 shell。
- **影响：**代理可能会在正常提交期间无限期地停止。
- **缓解：**使用 `git commit --no-verify -m "message"` 进行代理创建的提交。人类仍然可以使用 `corepack yarn commit` 或 `corepack yarn exec cz`。
- **状态：**已确认

### 需要 Corepack 以避免 Yarn classic

- **日期：** 2026-03-19
- **观察者：** Codex
- **上下文：**包管理器迁移到 Yarn 4
- **令人惊讶的是：**机器在 `PATH` 上仍然有全局 Yarn 经典安装，因此运行普通 `yarn` 可以解析为 v1 而不是固定的 Yarn 4 版本。
- **影响：**开发人员可能会意外绕过存储库的包管理器固定并获得不同的安装行为或锁定文件输出。
- **缓解：**使用 `corepack yarn ...` 作为 shell 命令，或首先运行 `corepack enable`，以便简单的 `yarn` 解析为固定的 Yarn 4 版本。
- **状态：**已确认

### 修复了 Bitsocial Web 工作树上的无端口应用程序名称冲突问题

- **日期：** 2026-03-30
- **观察者：** Codex
- **上下文：** 在一个 Bitsocial Web 工作树中启动 `yarn start`，而另一个工作树已通过 Portless
-  提供服务**令人惊讶的是：** 在每个工作树中使用字面 Portless 应用程序名称 `bitsocial` 会使路由本身发生冲突，即使支持端口不同，因此第二个过程会失败，因为`bitsocial.localhost` 已注册。
- **影响：** 并行 Bitsocial Web 分支可以互相阻止，即使 Portless 旨在让它们安全共存。
- **缓解：** 将 Portless 启动保留在 `scripts/start-dev.mjs` 后面，该启动现在使用规范案例之外的分支范围的 `*.bitsocial.localhost:1355` 路由，并回退到当裸 `bitsocial.localhost` 名称已被占用时，分支范围的路由。
- **状态：**已确认

### 文档预览用于硬编码端口 3001

- **日期：** 2026-03-30
- **观察者：** Codex
- **上下文：** 与其他本地存储库和代理一起运行 `yarn start`
- **令人惊讶的是：** root dev 命令使用 `docusaurus start --port 3001` 运行文档工作区，因此只要另一个进程已拥有 `3001`，整个开发会话就会失败，即使主应用程序已使用Portless。
- **影响：** `yarn start` 可能会在启动后立即终止 Web 进程，从而因文档端口冲突而中断不相关的本地工作。
- **缓解：** 让文档启动落后于 `yarn start:docs`，现在使用 Portless 加上 `scripts/start-docs.mjs` 来支持注入的空闲端口或在运行时回退到下一个可用端口直接。
- **状态：**已确认
