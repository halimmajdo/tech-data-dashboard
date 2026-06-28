let cart = [];

const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Open/Close Drawer Logic
cartToggle.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('show');
});

const closeDrawer = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('show');
};

cartClose.addEventListener('click', closeDrawer);
cartOverlay.addEventListener('click', closeDrawer);

// Add to Cart Logic
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price);

        // Check if item is already inside cart array
        if (!cart.some(item => item.id === id)) {
            cart.push({ id, name, price });
            updateCartUI();
        }
        
        // Auto open drawer to show action item added
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('show');
    });
});

// Remove Item Logic
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Global UI Rendering Refresh
function updateCartUI() {
    cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        cartTotal.innerText = '$0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <span>$${item.price}</span>
            </div>
            <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotal.innerText = `$${total}`;
}

// Simulated Check-out
checkoutBtn.addEventListener('click', () => {
    if(cart.length > 0) {
        alert("Thank you! This simulated checkout checkout is complete.");
        cart = [];
        updateCartUI();
        closeDrawer();
    }
});
