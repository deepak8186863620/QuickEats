let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const checkoutSection = document.querySelector(".checkout");

  cartContainer.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty 😢</p>';
    checkoutSection.style.display = "none";
    return;
  }

  cartItems.forEach((item, index) => {
    const subtotal = item.price * (item.quantity || 1);
    total += subtotal;

    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>₹${item.price} x ${item.quantity || 1} = ₹${subtotal}</p>
      <div class="cart-item-quantity">
        <button onclick="decreaseQty(${index})">−</button>
        <span>${item.quantity || 1}</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalPriceEl.textContent = total;
  checkoutSection.style.display = "block";
}

function increaseQty(index) {
  cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
  saveCart();
  loadCart();
}

function decreaseQty(index) {
  if ((cartItems[index].quantity || 1) > 1) {
    cartItems[index].quantity -= 1;
  } else {
    cartItems.splice(index, 1);
    showToast("Item removed from cart");
  }
  saveCart();
  loadCart();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  showToast("Item removed from cart");
  saveCart();
  loadCart();
}

function clearCart() {
  cartItems = [];
  saveCart();
  loadCart();
}

function saveOrderHistory(orderData) {
  const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
  history.push(orderData);
  localStorage.setItem("orderHistory", JSON.stringify(history));
}

function checkout() {
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0) * 100;

  const options = {
    key: "rzp_test_XXXXXXXXXXXXXXXX", // Replace with your real Razorpay key
    amount: total,
    currency: "INR",
    name: "QuickEats",
    description: "Order Payment",
    image: "images/logo.png",
    handler: function (response) {
      const order = {
        items: cartItems,
        total: total / 100,
        date: new Date().toLocaleString(),
        paymentId: response.razorpay_payment_id
      };
      saveOrderHistory(order);
      clearCart();
      showToast("✅ Payment Successful!");
    },
    prefill: {
      name: "QuickEats User",
      email: "example@email.com",
      contact: "9999999999"
    },
    theme: {
      color: "#ff4d4d"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

// Location check (10 km delivery radius from fixed point)
function checkDeliveryAvailability(lat1, lon1) {
  const storeLat = 17.385044; // e.g. Hyderabad
  const storeLon = 78.486671;

  const R = 6371; // Earth radius in km
  const dLat = (lat1 - storeLat) * Math.PI / 180;
  const dLon = (lon1 - storeLon) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(storeLat * Math.PI / 180) * Math.cos(lat1 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  if (distance > 10) {
    showToast("⚠️ Sorry! We don't deliver to your location.");
  } else {
    showToast("✅ You're within delivery area!");
  }
}

// Get user location on load
navigator.geolocation.getCurrentPosition(
  (pos) => checkDeliveryAvailability(pos.coords.latitude, pos.coords.longitude),
  () => showToast("⚠️ Location access denied. Can't verify delivery zone.")
);

loadCart();
