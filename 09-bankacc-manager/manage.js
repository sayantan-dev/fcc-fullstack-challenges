class BankAccount {
  constructor(name, email, phone, pin) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.pin = pin;
    this.balance = 0.00;
    this.history = `[LOG] Opened for ${this.name}\n`;
  }

  deposit(amt) {
    if (amt > 0) {
      this.balance = parseFloat((this.balance + amt).toFixed(2));
      this.history += `[+ CREDIT] +$${amt.toFixed(2)} (ATM)\n`;
      return { success: true };
    }
    return { success: false, msg: "Must be greater than zero." };
  }

  withdraw(amt) {
    if (amt > 0 && amt <= this.balance) {
      this.balance = parseFloat((this.balance - amt).toFixed(2));
      this.history += `[- DEBIT] -$${amt.toFixed(2)} (ATM)\n`;
      return { success: true };
    }
    return { success: false, msg: "Insufficient balance." };
  }

  creditTransfer(amt, sender) {
    this.balance = parseFloat((this.balance + amt).toFixed(2));
    this.history += `[+ CREDIT] +$${amt.toFixed(2)} (From: ${sender})\n`;
  }

  debitTransfer(amt, rec) {
    this.balance = parseFloat((this.balance - amt).toFixed(2));
    this.history += `[- DEBIT] -$${amt.toFixed(2)} (To: ${rec})\n`;
  }
}

const accountRegistry = new Map();
const registeredPins = new Set();
let activeSession = null;

const views = {
  menu: document.getElementById("view-main-menu"),
  create: document.getElementById("view-create-account"),
  delete: document.getElementById("view-delete-account"),
  gate: document.getElementById("view-atm-gate"),
  dash: document.getElementById("view-atm-dashboard")
};

function switchView(target) {
  document.querySelectorAll(".status-banner").forEach(b => b.textContent = "");
  closeAllSubForms();
  Object.keys(views).forEach(k => {
    if (k === target) views[k].classList.remove("hidden");
    else views[k].classList.add("hidden");
  });
}

document.getElementById("btn-goto-create").addEventListener("click", () => switchView("create"));
document.getElementById("btn-goto-delete").addEventListener("click", () => switchView("delete"));
document.getElementById("btn-goto-atm").addEventListener("click", () => switchView("gate"));

document.querySelectorAll(".btn-cancel").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("form").forEach(f => f.reset());
    switchView("menu");
  });
});

document.getElementById("form-create").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("create-name").value.trim();
  const email = document.getElementById("create-email").value.trim();
  const phone = document.getElementById("create-phone").value.trim();
  const pin = document.getElementById("create-pin").value;
  const msg = document.getElementById("create-message");

  if (accountRegistry.has(phone)) {
    displayStatus(msg, "Error: Phone already registered.", false);
    return;
  }
  if (registeredPins.has(pin)) {
    displayStatus(msg, "Error: PIN must be unique.", false);
    return;
  }

  const newAcc = new BankAccount(name, email, phone, pin);
  accountRegistry.set(phone, newAcc);
  registeredPins.add(pin);
  displayStatus(msg, `Success: Account created.`, true);
  e.target.reset();
});

document.getElementById("form-delete").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = document.getElementById("delete-phone").value.trim();
  const pin = document.getElementById("delete-pin").value;
  const msg = document.getElementById("delete-message");

  if (accountRegistry.has(phone)) {
    const acc = accountRegistry.get(phone);
    if (acc.pin === pin) {
      registeredPins.delete(pin);
      accountRegistry.delete(phone);
      displayStatus(msg, "Account deleted successfully.", true);
      e.target.reset();
      return;
    }
  }
  displayStatus(msg, "Error: Enter correct data.", false);
});

document.getElementById("form-atm-login").addEventListener("submit", (e) => {
  e.preventDefault();
  const pin = document.getElementById("atm-login-pin").value;
  const msg = document.getElementById("atm-login-message");

  let target = null;
  for (let acc of accountRegistry.values()) {
    if (acc.pin === pin) {
      target = acc;
      break;
    }
  }

  if (target) {
    activeSession = target;
    e.target.reset();
    hydrateDashboard();
    switchView("dash");
  } else {
    displayStatus(msg, "Error: Invalid ATM PIN.", false);
  }
});

document.getElementById("btn-logout").addEventListener("click", () => {
  activeSession = null;
  switchView("menu");
});

const formBox = document.getElementById("atm-form-box");
const formTitle = document.getElementById("atm-form-title");
const opMessage = document.getElementById("atm-op-message");

const subForms = {
  deposit: document.getElementById("form-atm-deposit"),
  withdraw: document.getElementById("form-atm-withdraw"),
  transfer: document.getElementById("form-atm-transfer"),
  history: document.getElementById("console-history")
};

function hydrateDashboard() {
  const uName = activeSession.name.toUpperCase();
  document.getElementById("user-greeting").textContent = `WELCOME, ${uName}`;
  document.getElementById("user-meta").textContent = `ID: ${activeSession.phone}`;
  document.getElementById("display-balance").textContent = `$${activeSession.balance.toFixed(2)}`;
}

function openSubForm(opKey, titleText) {
  opMessage.textContent = "";
  formBox.classList.remove("hidden");
  formTitle.textContent = titleText;
  Object.keys(subForms).forEach(k => {
    if (k === opKey) subForms[k].classList.remove("hidden");
    else subForms[k].classList.add("hidden");
  });
}

function closeAllSubForms() {
  formBox.classList.add("hidden");
  Object.values(subForms).forEach(f => f.classList.add("hidden"));
  document.querySelectorAll(".atm-sub-form").forEach(f => { if(f.reset) f.reset(); });
}

document.querySelectorAll(".btn-close-op").forEach(b => b.addEventListener("click", closeAllSubForms));

document.getElementById("btn-op-deposit").addEventListener("click", () => openSubForm("deposit", "DEPOSIT ENGINE"));
document.getElementById("btn-op-withdraw").addEventListener("click", () => openSubForm("withdraw", "EXTRACTION ENGINE"));
document.getElementById("btn-op-transfer").addEventListener("click", () => openSubForm("transfer", "WIRE TRANSFER"));
document.getElementById("btn-op-history").addEventListener("click", () => {
  openSubForm("history", "SYSTEM LOG LEDGER");
  document.getElementById("history-log-output").textContent = activeSession.history;
});

document.getElementById("form-atm-deposit").addEventListener("submit", (e) => {
  e.preventDefault();
  const amt = parseFloat(document.getElementById("deposit-amount").value);
  const outcome = activeSession.deposit(amt);
  if (outcome.success) {
    hydrateDashboard();
    displayStatus(opMessage, "Amount added successfully.", true);
    e.target.reset();
  } else {
    displayStatus(opMessage, outcome.msg, false);
  }
});

document.getElementById("form-atm-withdraw").addEventListener("submit", (e) => {
  e.preventDefault();
  const amt = parseFloat(document.getElementById("withdraw-amount").value);
  const outcome = activeSession.withdraw(amt);
  if (outcome.success) {
    hydrateDashboard();
    displayStatus(opMessage, "Amount Withdrawn Successfully.", true);
    e.target.reset();
  } else {
    displayStatus(opMessage, outcome.msg, false);
  }
});

document.getElementById("form-atm-transfer").addEventListener("submit", (e) => {
  e.preventDefault();
  const recPhone = document.getElementById("transfer-recipient").value.trim();
  const amt = parseFloat(document.getElementById("transfer-amount").value);

  if (recPhone === activeSession.phone) {
    displayStatus(opMessage, "Transfer failed: Cannot loopback to self.", false);
    return;
  }
  if (!accountRegistry.has(recPhone)) {
    displayStatus(opMessage, "Transfer failed: Recipient not found.", false);
    return;
  }
  if (amt <= 0 || amt > activeSession.balance) {
    displayStatus(opMessage, "Transfer failed: Invalid data.", false);
    return;
  }

  const recAcc = accountRegistry.get(recPhone);
  activeSession.debitTransfer(amt, recPhone);
  recAcc.creditTransfer(amt, activeSession.phone);

  hydrateDashboard();
  displayStatus(opMessage, "Transfer successful.", true);
  e.target.reset();
});

function displayStatus(el, text, success) {
  el.textContent = text;
  el.className = "status-banner " + (success ? "status-success" : "status-error");
}
