---
title: "NFT Marketplace"
status: "delisted"
deathDate: "2024-10-18"
cause: "NFT 泡沫破裂"
tech: ["React", "IPFS", "Ethereum"]
epitaph: "数字艺术品的葬礼"
description: "一个主打独立数字艺术品买卖的去中心化 NFT 交易市场，在经历了几次重入攻击（Reentrancy）测试以及全球 NFT 交易量萎缩 99% 的行业冰冬后彻底关闭了网关。"
---

## 🔬 项目尸检报告 // PROJECT AUTOPSY REPORT

### 1. 起因与设计初衷
在“小图片”动辄几百万美金的疯狂年代，开发者坚信数字艺术才是人类文明的未来，决定为独立插画师们打造一个完全去中心化、低版税的 NFT 发行与交易市场。

### 2. 致命死因分析
- **行业雪崩**：2024年下半年，全球 NFT 交易量呈断崖式下跌，曾经高昂的藏品跌幅超过 98%。整个市场门可罗雀，平台连续三个月录得零交易额，导致 IPFS 托管服务欠费被自动销毁。
- **重入攻击漏洞（Reentrancy Attack）**：在智能合约设计中，平台转账功能先进行以太币的划转，而后才更新用户的余额状态。这使得攻击者可以通过编写恶意的 fallback 接收合约，在余额未更新前进行递归提现，险些将合约里的测试币全部卷走。

### 3. 核心失败代码回溯
```solidity
// ❌ 致命漏洞：先转账，后修改状态（经典的重入攻击温床）
function withdrawProfit() public {
    uint amount = artistBalances[msg.sender];
    require(amount > 0, "No profit to withdraw");
    
    // ❌ 危险！将控制权交给了外部调用者，而没有更新余额
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    // ❌ 应该在此之前把余额清零！
    artistBalances[msg.sender] = 0; 
}
```

### 4. 守墓人寄语
> "一张由哈希值定义的虚拟图片，它的价值只存在于下一个接盘者的共识中。当潮水退去，沙滩上只剩下一堆无用的智能合约地址。"
