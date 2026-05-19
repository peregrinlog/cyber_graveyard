---
title: "Crypto Trading Bot"
status: "liquidated"
deathDate: "2024-09-05"
cause: "熊市来临，资金归零"
tech: ["Python", "CCXT", "PostgreSQL"]
epitaph: "韭菜的墓碑上刻着 HODL"
description: "一个旨在通过网格交易与高频动量策略实现财务自由的自动加密货币量化交易机器人，最终在史诗级的极端单边行情中迎来强平强卖，资金彻底归零。"
---

## 🔬 项目尸检报告 // PROJECT AUTOPSY REPORT

### 1. 起因与设计初衷
在牛市的狂欢中，开发者自信爆棚，认为凭借自己半路出家的 Python 技能和简单的网格交易（Grid Trading）算法，就能在币圈开启无限印钞机。项目的口号是：“睡觉也能躺赚，用科学击败庄家。”

### 2. 致命死因分析
量化机器人在牛市的宽幅震荡中确实小赚了一笔，但在 2024 年 9 月的极端黑天鹅事件中惨遭重创：
- **单边暴跌无底洞**：网格交易策略的核心是震荡市。当遭遇极端单边暴跌行情时，机器人开始疯狂疯狂买入现货抄底，直至把保证金池子全部耗尽，最终被交易所系统无情清算强平（Liquidation）。
- **API 延迟与穿仓**：由于服务器部署在普通云节点，在行情剧烈波动时，网格机器人的 API 请求遭遇了交易所的限流（Rate Limit）和网络延迟。当止损指令发出时，市场价格早已穿透止损线，造成严重的穿仓。

### 3. 核心失败代码回溯
```python
# ❌ 致命的止损延时与无限开仓设计
def check_grid_trigger(current_price):
    for grid in grids:
        if current_price <= grid['buy_price'] and not grid['is_filled']:
            # 极端行情下，没有做好资金限制，一瞬间开了几十个抄底仓位
            order = exchange.create_market_buy_order('BTC/USDT', grid['amount'])
            grid['is_filled'] = True
            
    # ❌ 致命隐患：API 报错或限流时直接忽略了异常，导致止损未成功触发
    except Exception as e:
        logger.error(f"下单失败，忽略错误继续跑: {e}") 
```

### 4. 守墓人寄语
> "不要试图用简单的代码去对抗人性的贪婪与市场的波动。杠杆是死神的微笑，强平是散户的终局。"
