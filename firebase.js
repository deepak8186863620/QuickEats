// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

export { auth };
