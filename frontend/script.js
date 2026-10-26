// Check if user is logged in
const token = localStorage.getItem("token");

// If logged in, update navbar buttons to show Dashboard
if (token) {
    const navBtns = document.getElementById("navBtns");
    if (navBtns) {
        navBtns.innerHTML = `
            <a href="dashboard.html">
                <button class="signup-btn">
                    <i class="fa-solid fa-gauge-high"></i> Dashboard
                </button>
            </a>
        `;
    }
}

// Modal handling
const modal = document.getElementById("loginModal");

function showLoginModal() {
    if (modal) modal.style.display = "flex";
}

// Protected Links (Navbar)
document.querySelectorAll(".protected-link").forEach(link => {
    link.addEventListener("click", (e) => {
        if (!token) {
            e.preventDefault();
            showLoginModal();
        }
    });
});

// Protected Buttons (Hero, Search, Routes)
document.querySelectorAll(".protected-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = btn.getAttribute("data-target") || "train-search.html";

        if (token) {
            window.location.href = target;
        } else {
            showLoginModal();
        }
    });
});

// Modal Actions
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        window.location.href = "signup.html";
    });
}

const closeModal = document.getElementById("closeModal");
if (closeModal) {
    closeModal.addEventListener("click", () => {
        if (modal) modal.style.display = "none";
    });
}

// Close modal when clicking on backdrop
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navBtns = document.getElementById("navBtns");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        if (navBtns) navBtns.classList.toggle("active");
    });
}
