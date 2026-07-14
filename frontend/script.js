const modal = document.getElementById("loginModal");

function showLoginModal() {

    modal.style.display = "flex";

}

document
.querySelectorAll(".protected-link")
.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        showLoginModal();

    });

});

document
.querySelectorAll(".protected-btn")
.forEach(btn => {

    btn.addEventListener("click", (e) => {

        e.preventDefault();

        showLoginModal();

    });

});

// ---------- Modal Buttons ----------

document
.getElementById("loginBtn")
.addEventListener("click", () => {

    window.location.href = "login.html";

});

document
.getElementById("signupBtn")
.addEventListener("click", () => {

    window.location.href = "signup.html";

});

document
.getElementById("closeModal")
.addEventListener("click", () => {

    modal.style.display = "none";

});

// Close modal when clicking outside it

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const navBtns = document.querySelector(".nav-btns");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    navBtns.classList.toggle("active");

});