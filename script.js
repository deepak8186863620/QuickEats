// script.js (Updated & Cleaned)

// ----------------------------
// 🧾 Menu Data
// ----------------------------
const menuItems = [
  { name: "Masala Dosa", price: 60, veg: true, category: "south", img: "dosa.jpg" },
  { name: "Idli Sambar", price: 50, veg: true, category: "south", img: "idli.jpg" },
  { name: "Chicken Biryani", price: 120, veg: false, category: "north", img: "biryani.jpg" },
  { name: "Pizza", price: 150, veg: false, category: "italian", img: "Pizza.jpg" },
  { name: "caprese Salad", price: 130, veg: true, category: "italian", img: "salad.jpg" },
  { name: "Pasta", price: 130, veg: true, category: "italian", img: "Pasta.jpg" },
  { name: "Bruschetta", price: 130, veg: true, category: "italian", img: "bru.jpg" },
  { name: "Margherita Pizza", price: 130, veg: true, category: "italian", img: "pzz.jpg" },
  { name: "Mushroom Risotto", price: 130, veg: true, category: "italian", img: "Mushroom.jpg" },
  { name: "Gelato IceCream", price: 130, veg: true, category: "italian", img: "gelato.jpg" },
  { name: "Uttapam", price: 70, veg: true, category: "south", img: "uttapam.jpg" },
  { name: "Chilli Paneer", price: 100, veg: true, category: "chinese", img: "paneer.jpg" },
  { name: "Veg Noodles", price: 100, veg: true, category: "chinese", img: "noodles.jpg" },
  { name: "Chicken Manchurian", price: 100, veg: false, category: "chinese", img: "manchurian.jpg" },
  { name: "Spring Rolles", price: 100, veg: true, category: "chinese", img: "springRoles.jpg" },
  { name: "chinese Plater", price: 250, veg: false, category: "chinese", img: "chinese.jpg" },
  { name: "Chinese soup", price: 100, veg: true, category: "chinese", img: "soup.jpg" },
  { name: "Medu Vada", price: 40, veg: true, category: "south", img: "vada.jpg" },
  { name: "Pongal", price: 65, veg: true, category: "south", img: "pongal.jpg" },
  { name: "Roti Sabji", price: 90, veg: true, category: "north", img: "RotiSabji.jpg" },
  { name: "Dal Chawal", price: 90, veg: true, category: "north", img: "DalChawal.jpg" },
  { name: "Paneer Butter Masala", price: 90, veg: true, category: "north", img: "pbm.jpg" },
  { name: "Palak Paneer", price: 90, veg: true, category: "north", img: "pp.jpg" },
  { name: "Raita", price: 40, veg: true, category: "north", img: "R.jpg" },
  { name: "Chicken Dum Biryani", price: 150, veg: false, category: "south", img: "cdb.jpg" },
  { name: "Chicken 65", price: 100, veg: false, category: "south", img: "c65.jpg" },
  { name: "Chicken Noodles", price: 80, veg: false, category: "south", img: "cn.jpg" },
  { name: "Egg Biryani", price: 70, veg: false, category: "south", img: "eb.jpg" },
  { name: "Chicken Burger", price: 90, veg: false, category: "south", img: "cb.jpg" },
  { name: "Chicken lolipop", price: 90, veg: false, category: "south", img: "cl.jpg" },
  { name: "chapathi", price: 90, veg: true, category: "north", img: "chapathi.jpg" },
  { name: "roti", price: 90, veg: true, category: "north", img: "roti.jpg" },
  { name: "Butter milk", price: 90, veg: false, category: "north", img: "bm.jpg" },
  { name: " Puri Sabji", price: 90, veg: false, category: "north", img: "ps.jpg" },
];

// ----------------------------
// 🛒 Cart Logic
// ----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(index) {
  const deliveryFlag = localStorage.getItem("deliveryAvailable") === "true";

  if (!deliveryFlag) {
    alert("❌ Delivery is not available in your area. Please try from a supported location.");
    return;
  }

  cart.push(menuItems[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${menuItems[index].name} added to cart!`);
}


function updateCartCount() {
  const count = cart.length;
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) cartCountEl.textContent = count;
}

// ----------------------------
// 🔍 Filter/Search Menu
// ----------------------------
function filterMenu() {
  const category = document.getElementById("category").value;
  const vegOnly = document.getElementById("veg-toggle").checked;
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = menuItems.filter(item => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesVeg = !vegOnly || item.veg;
    const matchesSearch = item.name.toLowerCase().includes(search);
    return matchesCategory && matchesVeg && matchesSearch;
  });

  renderMenu(filtered);
}

function renderMenu(items) {
  const container = document.querySelector(".menu-items");
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width:100%; height:150px; object-fit:cover;">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// ----------------------------
// 👤 Auth & UI Update
// ----------------------------
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

function updateUserUI() {
  const user = getLoggedInUser();
  const userSection = document.getElementById("user-section");
  if (!userSection) return;
  if (user) {
    userSection.innerHTML = `👋 Hello, ${user.name} | <a href="#" onclick="logout()">Logout</a>`;
  } else {
    userSection.innerHTML = `<a href="login.html">Login</a>`;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ----------------------------
// 📦 Load Cart Page
// ----------------------------
function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const checkoutSection = document.querySelector(".checkout");
  if (!cartContainer || !checkoutSection) return;

  cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty 😢</p>';
    checkoutSection.style.display = "none";
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  document.getElementById("total-price").textContent = total;
  checkoutSection.style.display = "block";
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCart();
}

function checkout() {
  let total = cartItems.reduce((sum, item) => sum + item.price, 0) * 100;

  let options = {
    key: "rzp_test_XXXXXXXXXXXXXXXX", // Replace with your Razorpay key
    amount: total,
    currency: "INR",
    name: "QuickEats",
    description: "Order Payment",
    handler: function (response) {
      alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
      cartItems = [];
      localStorage.removeItem("cart");
      loadCart();
    },
    prefill: {
      name: "Deepak",
      email: "deepakprajapatid021@gmail.com",
      contact: "8186863620"
    },
    theme: {
      color: "#ff4d4d"
    }
  };

  let rzp = new Razorpay(options);
  rzp.open();
}

// ----------------------------
// 🔐 Signup / Login
// ----------------------------
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

function login(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
    alert("✅ Login successful!");
    window.location.href = "index.html";
  } else {
    alert("❌ Invalid credentials!");
  }
}

// ----------------------------
// 🟢 INIT
// ----------------------------
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  updateCartCount();
  updateUserUI();
  filterMenu();
  if (document.body.contains(document.getElementById("cart-items"))) {
    loadCart();
  }
}
let isDeliveryAvailable = false;

function checkDeliveryLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    document.getElementById("location-status").textContent = "❌ Geolocation not supported.";
  }
}

function successCallback(position) {
  const { latitude, longitude } = position.coords;

  // Basic check for Hyderabad region (you can customize)
  isDeliveryAvailable = isWithinHyderabad(latitude, longitude);

  localStorage.setItem("deliveryAvailable", isDeliveryAvailable);
  updateDeliveryStatusText();
}

function errorCallback(error) {
  document.getElementById("location-status").textContent =
    "⚠️ Unable to detect location. Allow location access.";
  isDeliveryAvailable = false;
  localStorage.setItem("deliveryAvailable", false);
}

function isWithinHyderabad(lat, lon) {
  return lat >= 17.2 && lat <= 17.6 && lon >= 78.2 && lon <= 78.6;
}

function updateDeliveryStatusText() {
  const statusText = isDeliveryAvailable
    ? "✅ Delivery available in your area!"
    : "❌ Sorry, we don't deliver to your area yet.";
  document.getElementById("location-status").textContent = statusText;
}
checkDeliveryLocation();
