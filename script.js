
const products = [
    {
        name: "iPhone 18 Pro Max",
        category: "iPhone",
        price: 1299,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",
        description: "Professional performance and premium design."
    },
    {
        name: "iPhone 18",
        category: "iPhone",
        price: 899,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",
        description: "Powerful iPhone for everyday use."
    },
    {
        name: "iPhone 17 Pro",
        category: "iPhone",
        price: 1099,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",
        description: "Pro camera and performance."
    },
    {
        name: "MacBook Pro",
        category: "Mac",
        price: 1999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700",
        description: "Powerful laptop for professional work."
    },
    {
        name: "MacBook Air",
        category: "Mac",
        price: 1099,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700",
        description: "Thin, light and powerful."
    },
    {
        name: "iPad Pro",
        category: "iPad",
        price: 999,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700",
        description: "Powerful tablet for creativity."
    },
    {
        name: "iPad Air",
        category: "iPad",
        price: 599,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700",
        description: "Beautiful and versatile iPad."
    },
    {
        name: "Apple Watch Ultra",
        category: "Watch",
        price: 799,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
        description: "Built for adventure."
    },
    {
        name: "Apple Watch Series",
        category: "Watch",
        price: 399,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
        description: "Your everyday health companion."
    },
    {
        name: "AirPods Pro",
        category: "AirPods",
        price: 249,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",
        description: "Immersive wireless audio."
    },
    {
        name: "AirPods 4",
        category: "AirPods",
        price: 179,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700",
        description: "Comfortable everyday listening."
    },
    {
        name: "Apple Vision Pro",
        category: "Vision",
        price: 3499,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=700",
        description: "A new dimension of spatial computing."
    },
    {
        name: "Apple Home",
        category: "Home",
        price: 99,
        image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=700",
        description: "Explore the smart home experience."
    },
    {
        name: "iPhone Duo",
        category: "iPhone",
        price: 1499,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",
        description: "A concept product showcase."
    }
];

let cart = [];

// HTML ELEMENTS

const homePage = document.getElementById("homePage");
const catalog = document.getElementById("catalog");
const details = document.getElementById("details");
const productsBox = document.getElementById("products");
const cartPanel = document.getElementById("cart");
const overlay = document.getElementById("overlay");

// SHOW CATEGORY

function showCategory(category) {

    homePage.hidden = true;
    details.hidden = true;
    catalog.hidden = false;

    let filtered;

    if (category === "Store") {
        filtered = products;
    } else {
        filtered = products.filter(
            item => item.category === category
        );
    }

    document.getElementById("catalogTitle").textContent =
        category + " Collection";

    document.getElementById("catalogDescription").textContent =
        filtered.length
        ? "Explore our " + category + " products."
        : "No products available.";

    renderProducts(filtered);

    window.scrollTo(0, 0);
}

// SHOW PRODUCTS

function renderProducts(list) {

    productsBox.innerHTML = "";

    if (list.length === 0) {
        productsBox.innerHTML = "<h2>No products found!</h2>";
        return;
    }

    list.forEach(item => {

        productsBox.innerHTML += `
            <div class="product">
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <h3>$${item.price}</h3>

                <button class="primary"
                    onclick="showDetails('${item.name}')">
                    Learn More
                </button>

                <button class="primary"
                    onclick="addToCart('${item.name}')">
                    Add to Bag
                </button>
            </div>
        `;
    });
}

// PRODUCT DETAILS

function showDetails(name) {

    const item = products.find(p => p.name === name);

    if (!item) return;

    homePage.hidden = true;
    catalog.hidden = true;
    details.hidden = false;

    document.getElementById("detailsContent").innerHTML = `
        <h1>${item.name}</h1>
        <img src="${item.image}" alt="${item.name}">
        <h2>$${item.price}</h2>
        <p>${item.description}</p>

        <button class="primary"
            onclick="addToCart('${item.name}')">
            Add to Bag
        </button>
    `;

    window.scrollTo(0, 0);
}

// BACK BUTTON

function goHome() {
    homePage.hidden = false;
    catalog.hidden = true;
    details.hidden = true;
    window.scrollTo(0, 0);
}

// CART

function addToCart(name) {

    const item = products.find(p => p.name === name);

    if (!item) return;

    let existing = cart.find(p => p.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}

// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <b>${item.name}</b>
                <p>$${item.price} × ${item.quantity}</p>

                <button onclick="changeQuantity(${index}, -1)">−</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total").textContent = total;
    document.getElementById("cartCount").textContent = count;
}

// QUANTITY

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// REMOVE

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// OPEN CART

function openCart() {
    cartPanel.classList.add("active");
    overlay.classList.add("active");
}

function closeCart() {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
}

// SEARCH

function searchProducts() {

    const value = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    homePage.hidden = true;
    details.hidden = true;
    catalog.hidden = false;

    document.getElementById("catalogTitle").textContent =
        "Search Results";

    const filtered = products.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );

    renderProducts(filtered);
}

// EVENT LISTENERS

document.querySelectorAll("[data-category]").forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        if (category === "Home") {
            goHome();
        } else if (category === "Support") {
            alert("Welcome to Apple Support! Contact: support.apple.com");
        } else {
            showCategory(category);
        }

    });

});

// PRODUCT BUTTONS

document.querySelectorAll("[data-product]").forEach(button => {

    button.addEventListener("click", () => {
        showDetails(button.dataset.product);
    });

});

// SEARCH BUTTON

document.getElementById("searchBtn").addEventListener("click", () => {

    const area = document.getElementById("searchArea");

    area.style.display =
        area.style.display === "block" ? "none" : "block";

    if (area.style.display === "block") {
        document.getElementById("searchInput").focus();
    }

});

// SEARCH INPUT

document.getElementById("searchInput").addEventListener(
    "input",
    searchProducts
);

// CART BUTTON

document.getElementById("cartBtn").addEventListener(
    "click",
    openCart
);

// CLOSE CART

document.getElementById("closeCart").addEventListener(
    "click",
    closeCart
);

overlay.addEventListener("click", closeCart);

// BACK BUTTONS

document.getElementById("backBtn").addEventListener(
    "click",
    goHome
);

document.getElementById("detailsBack").addEventListener(
    "click",
    () => {
        showCategory("Store");
    }
);

// CHECKOUT

document.getElementById("checkout").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }

    alert("Demo checkout! Real payment requires a backend.");

});

// INITIAL CART

updateCart();
