document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission
    handleCheckout(event);
  });

function handleCheckout(event) {
  let hasError = false;

  // Clear previous error messages
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  // Validate Name
  const name = document.getElementById("name").value;
  if (name.trim() === "") {
    document.getElementById("nameError").textContent = "Name is required.";
    hasError = true;
  }

  // Validate Email
  const email = document.getElementById("email").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent =
      "Invalid email address.";
    hasError = true;
  }

  // Validate Address
  const address = document.getElementById("address").value;
  if (address.trim() === "") {
    document.getElementById("addressError").textContent =
      "Address is required.";
    hasError = true;
  }

  // Validate Card Number
  const cardNumber = document.getElementById("cardNumber").value;
  const cardPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
  if (!cardPattern.test(cardNumber)) {
    document.getElementById("cardNumberError").textContent =
      "Invalid card number format. Use: XXXX XXXX XXXX XXXX.";
    hasError = true;
  }

  // Validate Expiry Date
  const expiryDate = document.getElementById("expiryDate").value;
  const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryPattern.test(expiryDate)) {
    document.getElementById("expiryDateError").textContent =
      "Invalid expiry date format. Use: MM/YY.";
    hasError = true;
  }

  // Validate CVV
  const cvv = document.getElementById("cvv").value;
  const cvvPattern = /^\d{3}$/;
  if (!cvvPattern.test(cvv)) {
    document.getElementById("cvvError").textContent =
      "Invalid CVV format. Use: XXX.";
    hasError = true;
  }

  if (!hasError) {
    // Redirect to confirmation page if no errors
    window.location.href = "confirmation.html";
  }
}

// Real-time validation feedback
document.getElementById("name").addEventListener("input", function () {
  const name = this.value.trim();
  if (name === "") {
    document.getElementById("nameError").textContent = "Name is required.";
  } else {
    document.getElementById("nameError").textContent = "";
  }
});

document.getElementById("email").addEventListener("input", function () {
  const email = this.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent =
      "Invalid email address. Example: name@server.com";
  } else {
    document.getElementById("emailError").textContent = "";
  }
});

document.getElementById("address").addEventListener("input", function () {
  const address = this.value.trim();
  if (address === "") {
    document.getElementById("addressError").textContent =
      "Address is required.";
  } else {
    document.getElementById("addressError").textContent = "";
  }
});

document.getElementById("cardNumber").addEventListener("input", function () {
  const cardNumber = this.value;
  const cardPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
  if (!cardPattern.test(cardNumber)) {
    document.getElementById("cardNumberError").textContent =
      "Invalid card number format. Use: XXXX XXXX XXXX XXXX.";
  } else {
    document.getElementById("cardNumberError").textContent = "";
  }
});

document.getElementById("expiryDate").addEventListener("input", function () {
  const expiryDate = this.value;
  const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryPattern.test(expiryDate)) {
    document.getElementById("expiryDateError").textContent =
      "Invalid expiry date format. Use: MM/YY.";
  } else {
    document.getElementById("expiryDateError").textContent = "";
  }
});

document.getElementById("cvv").addEventListener("input", function () {
  const cvv = this.value;
  const cvvPattern = /^\d{3}$/;
  if (!cvvPattern.test(cvv)) {
    document.getElementById("cvvError").textContent =
      "Invalid CVV format. Use: XXX.";
  } else {
    document.getElementById("cvvError").textContent = "";
  }
});

// Manejo del carrito
document.addEventListener("DOMContentLoaded", function () {
  const total = localStorage.getItem("cartTotal");
  if (total) {
    document.getElementById("checkout-cart-total").textContent = total;
  }
});