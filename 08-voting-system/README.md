# 🏛️ Project 8: High-Performance Pure JS Voting Engine

A zero-overhead, multi-dimensional voting runtime engine built entirely in native JavaScript memory. This module implements advanced relational data architecture by nesting native `Set` collection footprints inside a master state tracking `Map`. 

By completely bypassing DOM structures, external database daemons, and linear array search loops, the engine processes data insertions and verification algorithms in absolute constant time.

---

## ⚡ Architectural Wins & Performance Specs

* **Computational Complexity**: All state validation gates and voter de-duplication checks execute in **O(1) Constant Time Complexity** via `Map.prototype.has()` and `Set.prototype.has()`. This ensures zero main-thread CPU lag on legacy local machines as data scales.
* **Relational Memory Layout**: Maps distinct selection string keys (`"Turkey"`, `"Morocco"`, `"Spain"`) directly to independent, isolated `Set` object instances as their values: `Map(Option -> Set(Voter_IDs))`.
* **Zero-Variable Totalization**: Eliminates vulnerable global counter variables. Vote tallies are evaluated on the fly by reading the native physical memory payload footprint size (`voters.size`).
* **Granular Audit Security**: Preserves a strict cryptographic audit trail of the exact, unique voter identifiers assigned to each polling option for instant fraud checks.

---

## ⚙️ Core Operational Methods

### 1. `addOption(option)`
* **Logic**: Evaluates structural entry uniqueness and runs sanitization string guards. If unique, initializes a blank `Set` instance for that target option key.
* **Edge-Cases Handled**: Explicitly catches and blocks empty strings (`""`) and filters out pre-existing duplicate entries.

### 2. `vote(option, voterId)`
* **Logic**: Intercepts fraud vectors by running a single-pass membership check on the option’s internal `Set`. If clean, appends the unique `voterId` via `.add()`.
* **Edge-Cases Handled**: Rejects invalid write-in entries and stops a single voter ID from injecting duplicate ballots into the same polling target.

### 3. `displayResults()`
* **Logic**: Executes a clean single-pass iterator loop (`for...of`) over the data rows (`poll.entries()`), compiling structural metrics cleanly via direct index arrays.

---

## 🚀 Execution & Expected Telemetry

Execute the logic engine directly inside your shell runtime workspace:
```powershell
node operate.js
```

### Active Mainframe Console Log Mapping:
```text
Option "Egypt" added to the poll.
Option cannot be empty.
Option "Turkey" already exists.
Option "Malaysia" does not exist.
Option "Algeria" does not exist.
Voter "traveler1" voted for option "Turkey".

Poll Results:
Turkey: 1 votes
Morocco: 0 votes
Spain: 0 votes
Egypt: 0 votes
```

---

## 📁 Repository State Mapping
* **Git Upstream Target**: `sayantan-dev/fcc-fullstack-challenges`
* **Deployment Rule**: 100% manual implementation under strict code minimization rules.
