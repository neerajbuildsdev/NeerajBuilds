/**
 * E-Commerce Store - JavaScript
 * Shopping cart, product filtering, search, wishlist, and localStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =====================
    // Product Data
    // =====================
    const products = [
        {
            id: 1,
            name: 'Pro Laptop',
            category: 'electronics',
            price: 999,
            icon: 'fa-laptop',
            color: 'emerald',
            description: 'High-performance laptop'
        },
        {
            id: 2,
            name: 'Headphones',
            category: 'accessories',
            price: 299,
            icon: 'fa-headphones',
            color: 'blue-500',
            description: 'Noise cancelling'
        },
        {
            id: 3,
            name: 'Smartphone',
            category: 'electronics',
            price: 799,
            icon: 'fa-mobile-alt',
            color: 'purple-500',
            description: 'Latest model'
        },
        {
            id: 4,
            name: 'Camera',
            category: 'electronics',
            price: 599,
            icon: 'fa-camera',
            color: 'orange-500',
            description: 'DSLR Camera'
        },
        {
            id: 5,
            name: 'Smart Watch',
            category: 'accessories',
            price: 349,
            icon: 'fa-clock',
            color: 'pink-500',
            description: 'Fitness tracker'
        },
        {
            id: 6,
            name: 'Tablet',
            category: 'electronics',
            price: 449,
            icon: 'fa-tablet-alt',
            color: 'indigo-500',
            description: '10-inch display'
        },
        {
            id: 7,
            name: 'Keyboard',
            category: 'accessories',
            price: 129,
            icon: 'fa-keyboard',
            color: 'gray-500',
            description: 'Mechanical keyboard'
        },
        {
            id: 8,
            name: 'Mouse',
            category: 'accessories',
            price: 79,
            icon: 'fa-mouse',
            color: 'cyan-500',
            description: 'Wireless mouse'
        }
    ];

    // =====================
    // State
    // =====================
    let cart = JSON.parse(localStorage.getItem('ecommerceCart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('ecommerceWishlist')) || [];
    let currentCategory = 'all';
    let searchQuery = '';

    // =====================
    // DOM Elements
    // =====================
    const productGrid = document.getElementById('productGrid');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadge = document.getElementById('cartBadge');
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('.filter-btn');

    // =====================
    // Render Products
    // =====================
    function renderProducts() {
        const filteredProducts = products.filter(product => {
            const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
            const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && searchMatch;
        });

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-600 mb-4"></i>
                    <p class="text-gray-500">No products found</p>
                </div>
            `;
            return;
        }

        productGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <i class="fas ${product.icon} text-4xl text-${product.color}/40"></i>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold mb-1">${product.name}</h3>
                    <p class="text-gray-400 text-xs mb-2">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="price-tag">$${product.price}</span>
                        <div class="flex gap-2">
                            <button class="wishlist-btn w-8 h-8 bg-surface border border-white/10 rounded-md flex items-center justify-center hover:border-red-500 transition-colors ${wishlist.includes(product.id) ? 'text-red-500 border-red-500' : 'text-gray-400'}" data-id="${product.id}">
                                <i class="fas fa-heart text-xs"></i>
                            </button>
                            <button class="add-to-cart w-8 h-8 bg-emerald rounded-md flex items-center justify-center hover:bg-emerald/80 transition-colors" data-id="${product.id}">
                                <i class="fas fa-plus text-white text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });

        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', toggleWishlist);
        });
    }

    // =====================
    // Cart Functions
    // =====================
    function addToCart(e) {
        const productId = parseInt(e.currentTarget.dataset.id);
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartUI();
        
        // Show feedback
        const btn = e.currentTarget;
        btn.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-plus text-white text-xs"></i>';
        }, 1000);
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }

    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                updateCartUI();
            }
        }
    }

    function saveCart() {
        localStorage.setItem('ecommerceCart', JSON.stringify(cart));
    }

    function updateCartUI() {
        // Update badge
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div class="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                        <i class="fas ${item.icon} text-${item.color}/40"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-medium text-sm">${item.name}</h4>
                        <p class="text-emerald text-sm">$${item.price}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="w-6 h-6 bg-surface rounded flex items-center justify-center text-gray-400 hover:text-white" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="text-sm w-6 text-center">${item.quantity}</span>
                        <button class="w-6 h-6 bg-surface rounded flex items-center justify-center text-gray-400 hover:text-white" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                    <button class="text-gray-400 hover:text-red-500" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash text-xs"></i>
                    </button>
                </div>
            `).join('');
        }
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = '$' + total;
    }

    // Make functions globally available
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;

    // =====================
    // Wishlist Functions
    // =====================
    function toggleWishlist(e) {
        const productId = parseInt(e.currentTarget.dataset.id);
        
        if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId);
        } else {
            wishlist.push(productId);
        }
        
        localStorage.setItem('ecommerceWishlist', JSON.stringify(wishlist));
        renderProducts();
    }

    // =====================
    // Search Functionality
    // =====================
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // =====================
    // Category Filter
    // =====================
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryFilters.forEach(b => {
                b.classList.remove('active', 'bg-emerald', 'text-white');
                b.classList.add('bg-surface', 'border', 'border-white/10', 'text-gray-400');
            });
            btn.classList.add('active', 'bg-emerald', 'text-white');
            btn.classList.remove('bg-surface', 'border', 'border-white/10', 'text-gray-400');
            
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // =====================
    // Cart Sidebar Toggle
    // =====================
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');

    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.remove('translate-x-full');
        });

        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.add('translate-x-full');
            });
        }
    }

    // =====================
    // Initialize
    // =====================
    renderProducts();
    updateCartUI();
    
    console.log('E-Commerce Store - Loaded');
});

