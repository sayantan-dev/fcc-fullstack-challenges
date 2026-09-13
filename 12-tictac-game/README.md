# Three In A Row 🕹️

A premium, cyberpunk-themed **React** arcade dashboard compiled via **Vite** [September 2026]. This application features a highly responsive game engine built around strict state synchronization frameworks and isolated interaction guardrails to pass the comprehensive freeCodeCamp test suite.

### 🌐 Live Production Link

Launch the deployment app live inside a browser frame at:
👉 **[https://sayantan-dev.github.io/fcc-fullstack-challenges/12-tictac-game/](https://sayantan-dev.github.io/fcc-fullstack-challenges/12-tictac-game/)**

---

## 🎨 Cyberpunk Aesthetic Styling Framework

- **The Neon Matrix:** Engineered with a radial-gradient dark neon background matrix, featuring a glowing blue **"Three In A Row"** display header card.
- **The Glowing Purple Grid:** The 3x3 interlocking board canvas is bound inside a neon purple borderscape with integrated inset lighting filters (`box-shadow: 0 0 15px rgba(189, 0, 255, 0.2)`).
- **Vector Pop Animations:** Implements an elastic scaling pulse script wrapped inside a specialized CSS transition rule (`@keyframes neonPop`). The millisecond a square state changes, the player marker pops onto the screen in high-density glowing green text styling.
- **Metallic Gold Actions Key:** Features a responsive gold layout reset button that shifts color matrices and anchors position vectors dynamically upon mouse hover and click actions.

## ⚙️ Core System Engineering

- **State Immutability Shield:** Player interactions utilize deep shallow arrays clones (`squares.slice()`) before pushing updates to the React tracking matrix. This prevents state mutation errors and ensures immediate rendering updates.
- **Collision Avoidance Guardrails:** Features a logical check handler barrier (`if (squares[index] || isGameOver) return;`). This locks used blocks and blocks input once a win or draw condition is reached, stopping players from overwriting turns or inflating move registers.
- **Automated Continuous Integration Pipeline:** Integrated directly into a multi-project **GitHub Actions workflow matrix** (`deploy.yml`). Pushing changes triggers automated cloud tests, isolates build distribution folders (`/dist`), and maps the arcade canvas to a distinct URL subfolder routing tree under the main portfolio domain.

## 🛠️ Local Sandbox Execution Setup

To host this hot-reloading compiler environment on an independent local workstation terminal, initialize these commands line-by-line:

```bash
# 1. Step directly inside the active game module workspace directory
cd 12-tictac-game

# 2. Pull down the required Node package dependency assets
npm install

# 3. Fire up the local hardware-accelerated development server on Port 5175
npm run dev
```
