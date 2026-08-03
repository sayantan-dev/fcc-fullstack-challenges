# Markdown to HTML Compiler Engine
### 🏆 JavaScript Certification Project Milestone | Sandbox Handle: `sayantan-dev`

An elegant, lightweight client-side compiler engine that parses a Markdown text stream and translates it into valid semantic HTML tokens in real-time. Built entirely with manual JavaScript string manipulation loops and conditional boundaries to guarantee predictable execution state without relying on third-party libraries or regular expressions.

---

## 🏛️ System Architecture

The engine functions exactly like an industrial compiler pipeline, routing text data sequentially through three independent processing sectors:

```text
[ Raw User Text Input ] 
          │
          ▼
┌──────────────────────────┐
│   1. Lexical Splitting   │ ───► Isolates structural lines via .split("\n")
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│    2. Token Processing   │ ───► Intercepts block tags (# Headings, > Quotes)
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│  3. Inline Token Slicing │ ───► Loops indices to hydrate inline modifiers
└─────────┬────────────────┘     (Images, Links, Bold, Italics)
          │
          ▼
[ Clean, Synthesized HTML Code Tree ]
```

### 🔬 Core Engineering Highlights
*   **Deterministic Interception Sequence:** The inline image parser explicitly runs *before* the general link parser. This deliberate order guarantees that image indicators (`![alt](src)`) are fully extracted before general bracket layouts (`[text](url)`) evaluate, preventing layout collisions and token corruption.
*   **Linear Parsing Boundaries:** Uses sub-string lookup pointers (`.indexOf()`, `.includes()`, `.slice()`) inside deterministic loop scopes to resolve structural boundaries. This method replaces regular expressions entirely, ensuring predictable runtime execution and readable code.
*   **Reactive Data Flow:** Binds a high-speed event loop to the user input vector. Every single stroke in the textarea updates and hydrates the raw HTML output string and layout preview window instantly.

---

## 🏁 How to Run Locally

### 1. File Structure Setup
Ensure your local project files are organized cleanly in your directory:
*   `index.html` — The structural layout grid.
*   `styles.css` — The responsive dark/light utility viewport styling.
*   `script.js` — The primary compiler execution logic.

### 2. Launching the App
Simply double-click `index.html` to open the application in any modern web browser, or use the Live Server extension inside VS Code. 

---

## 🚀 Workspace Git Routine
To stage and push this completed certification milestone to your online repository, execute your terminal pipeline commands:

```bash
git add index.html styles.css script.js README.md
git commit -m "feat(markdown-compiler): establish architecture documentation and finalize project deployment"
git push origin main
```
