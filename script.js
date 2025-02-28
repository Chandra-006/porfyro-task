let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch products from PHP API
async function fetchProducts() {
    try {
        const response = await fetch('api.php'); // Fetch data from the PHP API
        const data = await response.json();
        products = data;
        displayProducts(products);
        loadCategories();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products
function displayProducts(items) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
    items.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.varieties[0].price} - ${product.varieties[0].name}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(productCard);
    });
}

// Load categories for filtering
function loadCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    const categoryFilter = document.getElementById("categoryFilter");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.innerText = category;
        categoryFilter.appendChild(option);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Checkout
function checkout() {
    alert(`Total Price: $${cart.reduce((sum, item) => sum + item.varieties[0].price * item.quantity, 0)}`);
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
}

// Load products on page load
window.onload = function () {
    fetchProducts();
    updateCartCount();
};
