---
title: "Blockchain Revolution"
status: "abandoned"
deathDate: "2024-02-28"
cause: "Gas 费用太高，项目夭折"
tech: ["Solidity", "Web3.js", "Hardhat"]
epitaph: "去中心化的理想在此安息"
description: "一个旨在改变世界、实现全链上社交的去中心化区块链项目，最终在以太坊主网极度拥堵、Gas费高过服务器月租的现实面前宣告夭折。"
---

## 🔬 项目尸检报告 // PROJECT AUTOPSY REPORT

### 1. 起因与设计初衷
在 2024 年初的加密热潮中，开发者深受去中心化思潮启发，决定开发一款“永不被删帖”的区块链社交平台。用户的每一条留言、每一次点赞都将作为永久的交易刻写在以太坊主网上，实现“言论的赛博永生”。

### 2. 致命死因分析
去中心化的理想在以太坊主网高昂的手续费（Gas Fee）面前被砸得粉碎：
- **天价点赞**：测试中，用户在平台上发送一句“Hello World”需要支付价值 $45 的 Gas 费，而点赞一次则需要 $12。
- **循环溢出漏洞**：在编写 Solidity 智能合约时，开发者在处理用户数据时使用了一个无限增长的动态数组，并在循环中进行了状态修改。这导致每次交互消耗的 Gas 随用户量呈指数级增长，最终超出了区块的 Gas 上限（Block Gas Limit），导致合约彻底“卡死”无法交互。

### 3. 核心失败代码回溯
```solidity
// ❌ 致命的 Gas 吞噬循环
function broadcastMessage(string memory text) public {
    // 每次发送消息都会将所有用户循环一遍，Gas 费直接爆炸
    for (uint i = 0; i < allUsers.length; i++) {
        userBalances[allUsers[i]] += 1 wei; // 状态修改消耗极大 Gas
    }
    messages.push(Message(msg.sender, text, block.timestamp));
}
```

### 4. 守墓人寄语
> "在链上，呼吸都是要付费的。当每一次点赞的代价是一顿火锅时，去中心化就成了有钱人的专属狂欢。"
