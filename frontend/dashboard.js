const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

// ===================== PROFILE =====================

async function loadProfile() {

    try {

        const response = await fetch(

            "http://localhost:8080/api/auth/profile",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        if (!response.ok) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        const user = await response.json();

        document.getElementById("username").textContent = user.name;

        const initials = user.name
            .trim()
            .split(" ")
            .map(word => word[0])
            .slice(0,2)
            .join("")
            .toUpperCase();

        document.getElementById("profileAvatar").textContent = initials;

    }

    catch(error){

        console.log(error);

    }

}

// ===================== BOOKINGS =====================

async function loadBookings() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/bookings/my",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const bookings = await response.json();

        const table = document.getElementById("bookingTable");

        table.innerHTML = "";

        if (!bookings.length) {

            table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">
                    No Bookings Yet
                </td>
            </tr>
            `;

            document.getElementById("tripCount").textContent = 0;
            document.getElementById("totalFare").textContent = "₹0";
            document.getElementById("confirmedCount").textContent = 0;
            document.getElementById("cancelledCount").textContent = 0;

            return;
        }

        let totalFare = 0;
        let confirmed = 0;
        let cancelled = 0;

        bookings.forEach(booking => {

            totalFare += booking.fare || 0;

            if (booking.status === "Confirmed") {

                confirmed++;

            } else {

                cancelled++;

            }

        });

        document.getElementById("tripCount").textContent = bookings.length;

        document.getElementById("totalFare").textContent =
            "₹" + totalFare;

        document.getElementById("confirmedCount").textContent =
            confirmed;

        document.getElementById("cancelledCount").textContent =
            cancelled;

        bookings.slice(0, 3).forEach(booking => {

            table.innerHTML += `
            <tr>
                <td>${booking.trainName}</td>
                <td>${booking.from} → ${booking.to}</td>
                <td>${booking.journeyDate || "-"}</td>
                <td>
                    <span class="${booking.status === "Confirmed" ? "confirmed" : "cancelled"}">
                        ${booking.status}
                    </span>
                </td>
            </tr>
            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// ===================== NOTIFICATIONS =====================

const notificationBtn = document.getElementById("notificationBtn");

const notificationList = document.getElementById("notificationList");

const notificationDot = document.getElementById("notificationDot");

function addNotification(message,icon="📢"){

    let notifications = JSON.parse(

        localStorage.getItem("notifications")

    ) || [];

    notifications.unshift({

        icon,

        message,

        time:new Date().toLocaleString()

    });

    if(notifications.length>10){

        notifications.pop();

    }

    localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

    );

}

function loadNotifications() {

    let notifications = [];

    try {

        notifications = JSON.parse(localStorage.getItem("notifications")) || [];

    }

    catch {

        localStorage.removeItem("notifications");

        notifications = [];

    }

    if (notifications.length === 0) {

        notifications = [

            {
                icon: "🎉",
                message: "Welcome to RailNova!",
                time: new Date().toLocaleString()
            },

            {
                icon: "🚆",
                message: "Search trains and book tickets easily.",
                time: new Date().toLocaleString()
            },

            {
                icon: "💺",
                message: "View all your bookings anytime.",
                time: new Date().toLocaleString()
            }

        ];

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

    }

    notificationList.innerHTML = "";

    notifications.forEach(item => {

        notificationList.innerHTML += `

        <div class="notification-item">

            <div class="notification-icon">${item.icon}</div>

            <div class="notification-text">

                <strong>${item.message}</strong><br>

                <small>${item.time}</small>

            </div>

        </div>

        `;

    });

}

notificationBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    notificationBtn.classList.toggle("show");

    notificationDot.style.display="none";

});

document.addEventListener("click",()=>{

    notificationBtn.classList.remove("show");

});

// ===================== LOGOUT =====================

document.getElementById("logoutBtn").addEventListener("click",()=>{

    localStorage.removeItem("token");

    window.location.href="login.html";

});

// ===================== INITIAL LOAD =====================

loadProfile();

loadBookings();

loadNotifications();


const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const overlay = document.getElementById("overlay");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.add("show");

        overlay.classList.add("show");

    });

}

overlay.addEventListener("click",()=>{

    sidebar.classList.remove("show");

    overlay.classList.remove("show");

});