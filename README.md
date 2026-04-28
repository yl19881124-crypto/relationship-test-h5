# relationship-test-h5

移动端 H5 MVP：**测测你和TA到底是什么关系**。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 配置位置

- 题目、选项、分值：`src/data/questions.ts`
- 16类结果文案：`src/data/results.ts`
- 规则匹配与评分逻辑：`src/utils/evaluator.ts`

## 运行说明（当前 Codex 环境）

由于当前 Codex 环境访问 npm registry 返回 **403**，未能在云端完成 `npm install` / `npm run build` 的实际验证。

请在本地开发环境或 Vercel 环境执行以下命令进行完整验证：

```bash
npm install
npm run dev
npm run build
```
