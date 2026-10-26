const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let payload = {};
try {
    payload = JSON.parse(atob(token.split(".")[1]));
} catch (e) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

if (payload.role !== "admin") {
    alert("Access Denied");
    window.location.href = "dashboard.html";
}

// Set avatar initials to SJ
const avatarEl = document.getElementById("avatarLetter");
if (avatarEl) {
    avatarEl.textContent = "SJ";
}

// Global chart variables
let bookingChart = null;
let statusChart = null;

// Initialize charts immediately so they are ALWAYS visible
function initCharts(confirmed = 0, cancelled = 0, today = 0) {
    const bookingCanvas = document.getElementById("bookingChart");
    if (bookingCanvas) {
        if (bookingChart) bookingChart.destroy();
        bookingChart = new Chart(bookingCanvas, {
            type: "bar",
            data: {
                labels: ["Confirmed", "Cancelled", "Today"],
                datasets: [{
                    label: "Bookings",
                    data: [confirmed, cancelled, today],
                    backgroundColor: ["#16a34a", "#dc2626", "#2563eb"],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 }
                    }
                }
            }
        });
    }

    const statusCanvas = document.getElementById("statusChart");
    if (statusCanvas) {
        if (statusChart) statusChart.destroy();
        statusChart = new Chart(statusCanvas, {
            type: "pie",
            data: {
                labels: ["Confirmed", "Cancelled"],
                datasets: [{
                    data: [confirmed, cancelled],
                    backgroundColor: ["#16a34a", "#dc2626"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }
}

// Call initCharts immediately with default zeros so canvas renders instantly
initCharts(0, 0, 0);

// Fetch analytics from local or production with automatic fallback
async function fetchAnalytics() {
    const isLocal = window.location.hostname === "localhost" || 
                    window.location.hostname === "127.0.0.1" || 
                    window.location.protocol === "file:";

    const primaryUrl = isLocal ? "http://localhost:8080" : "https://railnova.onrender.com";
    const fallbackUrl = isLocal ? "https://railnova.onrender.com" : "http://localhost:8080";

    try {
        const res = await fetch(`${primaryUrl}/api/admin/analytics`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) return await res.json();
    } catch (err) {
        console.warn(`Primary fetch from ${primaryUrl} failed, trying fallback...`);
    }

    try {
        const res = await fetch(`${fallbackUrl}/api/admin/analytics`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) return await res.json();
    } catch (err) {
        console.warn(`Fallback fetch from ${fallbackUrl} failed.`);
    }

    return null;
}

async function loadDashboard() {
    const analytics = await fetchAnalytics();

    if (!analytics) {
        console.log("Could not load analytics from server.");
        return;
    }

    // Stats Values
    document.getElementById("revenue").textContent = "₹" + Number(analytics.totalRevenue || 0).toLocaleString("en-IN");
    document.getElementById("bookings").textContent = analytics.totalBookings || 0;
    document.getElementById("confirmed").textContent = analytics.confirmedBookings || 0;
    document.getElementById("trains").textContent = analytics.totalTrains || 0;

    document.getElementById("users").textContent = analytics.totalUsers || 0;
    document.getElementById("today").textContent = analytics.todayBookings || 0;
    document.getElementById("cancelled").textContent = analytics.cancelledBookings || 0;
    document.getElementById("routes").textContent = analytics.popularRoutes ? analytics.popularRoutes.length : 0;

    // Recent Bookings Table
    const recent = document.getElementById("recentBookings");
    recent.innerHTML = "";

    if (!analytics.recentBookings || analytics.recentBookings.length === 0) {
        recent.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#64748b; padding:20px 0;">No recent bookings</td></tr>`;
    } else {
        analytics.recentBookings.forEach(b => {
            const statusClass = b.status === "Cancelled" ? "cancelled" : "confirmed";
            recent.innerHTML += `
                <tr>
                    <td><strong>${b.passengerName || "Passenger"}</strong></td>
                    <td>${b.trainName || "-"}</td>
                    <td>₹${b.fare || 0}</td>
                    <td><span class="${statusClass}">${b.status || "Confirmed"}</span></td>
                </tr>
            `;
        });
    }

    // Popular Routes
    const routes = document.getElementById("popularRoutes");
    routes.innerHTML = "";

    if (!analytics.popularRoutes || analytics.popularRoutes.length === 0) {
        routes.innerHTML = `<p style="color:#64748b; font-size:14px;">No popular routes yet.</p>`;
    } else {
        analytics.popularRoutes.forEach(route => {
            const from = route._id?.from || "";
            const to = route._id?.to || "";
            routes.innerHTML += `
                <div>
                    <span>🚆 ${from} → ${to}</span>
                    <strong>${route.count || 0}</strong>
                </div>
            `;
        });
    }

    // Update charts with loaded live data
    initCharts(
        analytics.confirmedBookings || 0,
        analytics.cancelledBookings || 0,
        analytics.todayBookings || 0
    );
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    };
}

// Mobile sidebar toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
        overlay.classList.add("show");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    });
}

loadDashboard();
