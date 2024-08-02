document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.querySelector(".navbar");

  mobileMenu.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  

  // Manejo del carrito
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;

  window.addToCart = (productName, productPrice) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;
    cartItems.appendChild(listItem);

    total += productPrice;
    cartTotal.textContent = total.toFixed(2);
  };

  // Manejo de favoritos
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

  // Manejo del botón Checkout
  const checkoutButton = document.getElementById("checkout-button");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
});

// Función para manejar el envío del formulario de checkout
function handleCheckout() {
  console.log("handleCheckout called");
  // Captura los datos del formulario
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    cardNumber: document.getElementById("cardNumber").value,
    expiryDate: document.getElementById("expiryDate").value,
    cvv: document.getElementById("cvv").value,
  };

  // Validación básica
  if (
    formData.name &&
    formData.email &&
    formData.address &&
    formData.cardNumber &&
    formData.expiryDate &&
    formData.cvv
  ) {
    // Aquí puedes agregar más validación, como el formato del número de tarjeta
    // ...

    // Procesa la información (por ejemplo, guarda en localStorage o envía a un servidor)
    localStorage.setItem("checkoutData", JSON.stringify(formData));

    window.location.href = "confirmation.html";
    return false; // Prevenir el envío por defecto del formulario
  } else {
    document.getElementById("checkoutErrorMessages").textContent =
      "Please fill out all fields.";
    return false; // Prevenir el envío por defecto del formulario
  }
}

// Función para manejar el envío del formulario de contacto
function handleContactFormSubmit() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validación y envío del formulario de contacto
  if (name && email && message) {
    alert("Thank you for contacting us!");
    return true; // Permitir el envío del formulario
  } else {
    document.getElementById("contactErrorMessages").textContent =
      "Please fill out all fields.";
    return false; // Prevenir el envío por defecto del formulario
  }
}

// Código para la visualización de la factura en la página de checkout (para checkout.html)
document.addEventListener("DOMContentLoaded", () => {
  const orderDetails = document.getElementById("orderDetails");
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  if (checkoutData && checkoutData.items) {
    let html = `<h3>Items:</h3>
                <ul>`;

    checkoutData.items.forEach((item) => {
      html += `<li>${item.name} - $${item.price} x ${item.quantity}</li>`;
    });

    html += `</ul>
             <h3>Total: $${checkoutData.items.reduce(
               (total, item) => total + item.price * item.quantity,
               0
             )}</h3>`;

    orderDetails.innerHTML = html;
  } else {
    orderDetails.innerHTML = "<p>No order details found.</p>";
  }
});

// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Function to open modal with the clicked image
function openModal(src, alt) {
  modal.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = alt;
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Add click event listeners to images
document.querySelectorAll('.buy-online-image').forEach(image => {
  image.addEventListener('click', function() {
    openModal(this.src, this.alt);
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Add to cart functionality
document
  .getElementById("checkout-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    const total = document.getElementById("cart-total").textContent;
    localStorage.setItem("cartTotal", total);
    window.open("checkout.html", "_blank"); // Abre checkout.html en una nueva ventana
  });
