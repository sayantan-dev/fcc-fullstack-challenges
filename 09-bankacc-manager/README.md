# 🏛️ Project 9: Multi-Tenant Corporate Banking System
(Page Live at https://sayantan-dev.github.io/fcc-fullstack-challenges/09-bankacc-manager/acc.html)
A high-performance, framework-free banking ledger and ATM simulator built entirely in native JavaScript memory. This module implements a secure multi-tenant architecture that manages isolated bank account object instances using optimized lookup structures, running completely inside a custom single-page web dashboard interface.

---

## ⚡ Architectural Performance Specs

* **Computational Complexity**: Core customer account lookups execute in absolute constant time (**O(1)**) via global `Map` key-value pairs (`accountRegistry.get(phone)`).
* **PIN Collision Firewall**: Real-time ATM PIN uniqueness constraints are enforced in **O(1) complexity** via a dedicated background memory `Set` (`registeredPins.has(pin)`), completely eliminating linear array search loops.
* **Atomic Funds Transfer Protocol**: Inter-account wire transfers execute within an isolated, double-entry transactional sequence to guarantee absolute data integrity. If any check fails, the operation immediately aborts to prevent cash duplication or leakage.
* **Aggregated Ledger Optimization**: Account history statements append directly into a dynamic, local instance string (`this.history`). This tracks credits and debits instantly, bypassing the memory overhead of mapping massive array loops during view rendering.
* **Precision Floating-Point Management**: All numeric mutations are bounded with `parseFloat((val).toFixed(2))` to intercept and neutralize native binary floating-point rounding bugs (`0.1 + 0.2` corruption).

---

## ⚙️ Core Operational Flow & Methods

### 1. `deposit(amt)`
* Evaluates input boundary constraints ($> 0$), runs floating-point calculations, and appends a `+ CREDIT` log directly to the ledger history string asset.

### 2. `withdraw(amt)`
* Validates extraction parameters against the active account balance. If clear, debits the instance and appends a `- DEBIT` log.

### 3. `debitTransfer() / creditTransfer()`
* High-security accounting gateways that update account data blocks concurrently during an inter-account wire transfer.

---

## 🎨 Design System Specs

* **Visual Identity**: Modern Dark FinTech Neo-Brutalism using pure vanilla HTML, CSS Grid, and CSS Flexbox to maintain a locked **60 FPS render rate** on low-end local hardware.
* **Color Hierarchy**: Canvas background (`#08090c`), panel widgets (`#12141c`), action keys (`#2563eb`), metrics success green (`#10b981`), and termination crimson (`#ef4444`).
* **Typography**: Integrated monospace tracking font (**JetBrains Mono** / **Inter**) to ensure transaction statements and ledger numbers align perfectly in vertical grid layouts.
