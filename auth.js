// auth.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB8FO6fWpZu6E0__NVZNTUm4O0961AywQo",
  authDomain: "quickeats-94d5c.firebaseapp.com",
  projectId: "quickeats-94d5c",
  storageBucket: "quickeats-94d5c.appspot.com",
  messagingSenderId: "257766349595",
  appId: "1:257766349595:web:2522f028c9ccd641b591be",
  measurementId: "G-Y401X76X1J"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("✅ Account created! Redirecting to login...");
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert("❌ " + error.message);
      });
  });
}

// 🔐 LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("✅ Login successful!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("❌ " + error.message);
      });
  });
}
