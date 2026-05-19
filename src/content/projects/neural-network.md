---
title: "Neural Network v0.1"
status: "terminated"
deathDate: "2023-11-15"
cause: "内存泄漏导致系统崩溃"
tech: ["Python", "TensorFlow", "CUDA"]
epitaph: "这里长眠着一个未完成的梦想"
description: "一个旨在通过深度神经网络预测彩票开奖的划时代项目，最终因CUDA显存爆炸以及严重的内存泄漏在本地RTX 3060显卡上光荣殉职。"
---

## 🔬 项目尸检报告 // PROJECT AUTOPSY REPORT

### 1. 起因与设计初衷
本项目的野心极大，开发者试图通过构建一个 18 层的深度卷积神经网络（CNN）配合长短期记忆网络（LSTM），来预测双色球彩票的开奖规律。开发者坚信：“随机数也是有规律的，只要神经网络足够深，就能把庄家薅秃。”

### 2. 致命死因分析
在实际训练过程中，发生了以下毁灭性灾难：
- **PyTorch 显存黑洞**：由于在训练循环中忘记调用 `loss.item()`，而是直接累加了 Tensor 类型的 `loss`，导致整个计算图在内存中持续堆积，最终引发了著名的 `CUDA Out of Memory`。
- **物理硬件超载**：本地开发机（RTX 3060 12GB）在连续运行 32 小时后，风扇噪音堪比直升机起飞，温度飙升至 95℃，触发了主板的温度保护机制，直接黑屏关机。

### 3. 核心失败代码回溯
```python
# 致命的代码行（历史罪证）
total_loss = 0
for data, target in train_loader:
    optimizer.zero_grad()
    output = model(data)
    loss = criterion(output, target)
    loss.backward()
    optimizer.step()
    
    # ❌ 错误：这会导致显存中堆积整个计算图！
    total_loss += loss 
    # 📝 正确做法应该是：total_loss += loss.item()
```

### 4. 守墓人寄语
> "随机数的真理在于不可预测。试图用 CUDA 显卡去窥探上帝的骰子，其代价就是显存的自我毁灭。"
