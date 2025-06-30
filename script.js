const BACKEND_URL = "https://ludo-don-backend-4s2i.onrender.com";

const playerName = "player1";
document.getElementById("player-name").textContent = playerName;

async function updateWallet() {
  const res = await fetch(\`\${BACKEND_URL}/wallet/\${playerName}\`);
  const data = await res.json();
  document.getElementById("wallet-balance").textContent = data.balance || 0;
}
updateWallet();

function rollDice() {
  const result = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").textContent = "You rolled a " + result + "!";
}

async function adminLogin() {
  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;
  const res = await fetch(\`\${BACKEND_URL}/login\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.success) {
    alert("Admin logged in!");
    document.getElementById("admin-actions").style.display = "block";
  } else {
    alert("Invalid credentials");
  }
}
async function playerLogin() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password })
  });

  const data = await res.json();
  if (data.success) {
    document.getElementById("login-status").textContent = "Login successful!";
    // Show wallet / game UI here
  } else {
    document.getElementById("login-status").textContent = "Login failed!";
  }
}
async function addMoney() {
  const username = document.getElementById("wallet-user").value;
  const amount = parseInt(document.getElementById("wallet-amount").value);
  const res = await fetch(\`\${BACKEND_URL}/wallet\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, amount }),
  });
  const data = await res.json();
  alert("Money added. New balance: ₹" + data.balance);
}

async function toggleBot(val) {
  const res = await fetch(\`\${BACKEND_URL}/toggle-bot\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enable: val === "true" }),
  });
  const data = await res.json();
  alert("Bot mode: " + (val === "true" ? "Enabled" : "Disabled"));
}
