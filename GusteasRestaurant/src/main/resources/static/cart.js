let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    document.getElementById("count").innerText = cart.length;
    const list = document.getElementById("cartList");
    list.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - $${item.price}</span>
                <span class="remove" onclick="removeItem(${i})">×</span>
            </div>`;
    });
    document.getElementById("total").innerText = total;
}

function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function toggleCart() {
    const popup = document.getElementById("cartPopup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}


updateCart(); // run on every page







    let cart = JSON.parse(localStorage.getItem('gusteaCart') || '[]');

    function addToCart(button) {
    const card = button.closest('.bg-zinc-800');
    if (!card) {
    console.error("Cannot find menu item card");
    return;
}

    const nameEl = card.querySelector('h3');
    const priceEl = card.querySelector('.price');

    if (!nameEl || !priceEl) {
    console.error("Missing name or price element");
    return;
}

    const name = nameEl.textContent.trim();

    // Clean price: "Rs.1 300" → "1300" → number
    let priceText = priceEl.textContent.trim();
    priceText = priceText.replace(/Rs\.|\s+|,/g, '');   // remove Rs. , spaces, commas
    const price = parseFloat(priceText) || 0;

    if (price <= 0) {
    console.warn(`Invalid price for ${name}: "${priceText}"`);
}

    // Load current cart
    let cart = JSON.parse(localStorage.getItem('gusteaCart') || '[]');

    // Find if already in cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
    existing.qty += 1;
} else {
    cart.push({ name, price, qty: 1 });
}

    // Save back
    localStorage.setItem('gusteaCart', JSON.stringify(cart));

    updateCartBadge();

    // Optional: toast (if you have the toast element)
    const toast = document.getElementById('cart-toast');
    if (toast) {
    document.getElementById('toast-msg').textContent = `${name} added to cart`;
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-16', 'opacity-0');
}, 3000);
}
}

    function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('gusteaCart') || '[]');
    const totalQty = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
    badge.textContent = totalQty;
    badge.style.opacity = totalQty > 0 ? '1' : '0';
}
}

    // Make sure badge updates when page loads
    document.addEventListener('DOMContentLoaded', updateCartBadge);
    // Run when page loads
    document.addEventListener('DOMContentLoaded', updateCartBadge);
