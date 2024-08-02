document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.querySelector(".navbar");

  mobileMenu.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  // Cart functionality
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;

  //function to add to cart
  window.addToCart = (productName, productPrice) => {
    const cartItem = { name: productName, price: productPrice };

    // Retrieve existing cart from localStorage or create a new one
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update UI
    const listItem = document.createElement("li");
    listItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;
    cartItems.appendChild(listItem);

    total += productPrice;
    cartTotal.textContent = total.toFixed(2);
  };

  // Favorite functionality
  window.toggleFavorite = (element, productName) => {
    element.classList.toggle("active");
    const favoritesDropdown = document.getElementById("favorites-dropdown");
    if (element.classList.contains("active")) {
      const favoriteItem = document.createElement("a");
      favoriteItem.href = "#";
      favoriteItem.textContent = productName;
      favoriteItem.classList.add("favorite-item");
      favoriteItem.setAttribute("data-product-name", productName);
      favoritesDropdown.appendChild(favoriteItem);
    } else {
      const favoriteItems = document.querySelectorAll(".favorite-item");
      favoriteItems.forEach((item) => {
        if (item.getAttribute("data-product-name") === productName) {
          item.remove();
        }
      });
    }
  };

  // Checkout button
  const checkoutButton = document.getElementById("checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      const total = cartTotal.textContent;
      localStorage.setItem("cartTotal", total);
      window.location.href = "checkout.html"; // Open checkout page
    });
  }

  // Modal functionality
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeModal = () => (modal.style.display = "none");

  window.openModal = (src, alt) => {
    modal.style.display = "block";
    modalImg.src = src;
    captionText.textContent = alt;
  };

  document.querySelectorAll(".buy-online-image").forEach((image) => {
    image.addEventListener("click", function () {
      openModal(this.src, this.alt);
    });
  });

  document.querySelector(".close").addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Checkout forms validation
  window.handleCheckout = () => {
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      cardNumber: document.getElementById("cardNumber").value,
      expiryDate: document.getElementById("expiryDate").value,
      cvv: document.getElementById("cvv").value,
    };

    if (Object.values(formData).every((field) => field)) {
      localStorage.setItem("checkoutData", JSON.stringify(formData));
      window.location.href = "confirmation.html";
      return false; // Prevent default form submission
    } else {
      document.getElementById("checkoutErrorMessages").textContent =
        "Please fill out all fields.";
      return false; // Prevent default form submission
    }
  };

  // Contact form validation
  window.handleContactFormSubmit = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      alert("Thank you for contacting us!");
      return true;
    } else {
      document.getElementById("contactErrorMessages").textContent =
        "Please fill out all fields.";
      return false;
    }
  };

  // Order details for confirmation page
  const orderDetails = document.getElementById("orderDetails");
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  if (checkoutData && checkoutData.items) {
    let html = `<h3>Items:</h3><ul>`;
    checkoutData.items.forEach((item) => {
      html += `<li>${item.name} - $${item.price} x ${item.quantity}</li>`;
    });
    html += `</ul><h3>Total: $${checkoutData.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )}</h3>`;
    orderDetails.innerHTML = html;
  } else {
    orderDetails.innerHTML = "<p>No order details found.</p>";
  }
});
