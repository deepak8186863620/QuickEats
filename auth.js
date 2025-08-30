// auth.js

// Signup (local for now – since Swecha API has no signup endpoint)
function signup(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("✅ Account created! Please login.");
  window.location.href = "login.html";
}

// Login using Swecha API
async function login(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("https://dev.api.corpus.swecha.org/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,   // Swecha API expects username
        password: password
      })
    });

    const data = await response.json();
    console.log("Login Response:", data);

    if (response.ok && data.access_token) {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("loggedInUser", JSON.stringify({ email }));

      alert("✅ Login successful!");
      window.location.href = "index.html";
    } else {
      alert("❌ Login failed: " + (data.detail || "Invalid credentials"));
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("⚠️ Something went wrong. Please try again.");
  }
}

// Logout
function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Check if user is logged in
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}
