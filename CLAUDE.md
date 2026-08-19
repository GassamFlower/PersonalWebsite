# CLAUDE.md — Claude Code 项目约束入口

> 本项目所有 AI 智能体必须遵守 `AGENT_CONSTITUTION.md` 中的所有规则。
> 请先阅读 `AGENT_CONSTITUTION.md`，再开始任何工作。

---

## 核心约束速览

- **项目本质**：纯静态单页站（Astro + 原生 CSS + Markdown），无后端/数据库/登录/接口。
- **诚实红线**：不伪造项目/成果/量级；不点名真实公司/客户/logo；"正在学/会用/开发中"如实标注。
- **内容真源**：改内容进 `src/content/`（md），不硬编码在组件里。
- **匿名化**：所有展示过脱敏检查。
- **框架优先**：用 Astro 官方能力，不自造框架/生成器。
- **门禁纪律**：未过立项门不进架构门，未过对应门禁不写对应代码。
- **成本**：忽略 node_modules/dist/.git/logs；一事一议；会话 ≤60；模型分层。

> 全部规则见 `AGENT_CONSTITUTION.md`，本文件仅作引用与速览。