const searchBtn = document.querySelector(".search-btn");
const quotaSelect = document.getElementById("quota");
const tatkalBanner = document.getElementById("tatkalBanner");

if (quotaSelect && tatkalBanner) {
    quotaSelect.addEventListener("change", () => {
        if (quotaSelect.value !== "General") {
            tatkalBanner.style.display = "block";
        } else {
            tatkalBanner.style.display = "none";
        }
    });
}

// Determine Backend URL dynamically
const BACKEND_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:8080"
    : "https://railnova.onrender.com";

searchBtn.addEventListener("click", async () => {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const results = document.getElementById("results");
    const quota = quotaSelect ? quotaSelect.value : "General";

    if (!from || !to) {
        alert("Enter Source and Destination");
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/trains/search?from=${from}&to=${to}`);
        const trains = await response.json();

        results.innerHTML = "";

        if (!Array.isArray(trains) || trains.length === 0) {
            results.innerHTML = `<h3>No Trains Found</h3>`;
            return;
        }

        trains.forEach(train => {
            let tatkalCharge = 0;
            let displayQuotaBadge = "";

            if (quota === "Tatkal") {
                tatkalCharge = 300;
                displayQuotaBadge = `<span style="background:#fef3c7;color:#92400e;padding:3px 8px;border-radius:6px;font-size:12px;font-weight:bold;margin-left:8px;">⚡ Tatkal (+₹300)</span>`;
            } else if (quota === "Premium Tatkal") {
                tatkalCharge = 500;
                displayQuotaBadge = `<span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:6px;font-size:12px;font-weight:bold;margin-left:8px;">🔥 Premium Tatkal (+₹500)</span>`;
            }

            const calculatedFare = train.fare + tatkalCharge;

            results.innerHTML += `
            <div class="train-card">
                <div class="train-info">
                    <h2>${train.trainName} ${displayQuotaBadge}</h2>
                    <p>Train No. ${train.trainNumber}</p>
                </div>

                <div class="journey">
                    <div class="station">
                        <h3>${train.departure}</h3>
                        <span>${train.from}</span>
                    </div>

                    <div class="journey-line">
                        <span class="line"></span>
                        <small>${train.duration}</small>
                    </div>

                    <div class="station">
                        <h3>${train.arrival}</h3>
                        <span>${train.to}</span>
                    </div>
                </div>

                <div class="train-extra">
                    <div class="available">
                        ${train.availableSeats} Seats | ₹${calculatedFare}
                    </div>

                    <button
                        class="book-btn"
                        onclick='bookTrain(${JSON.stringify(train)}, "${quota}", ${tatkalCharge})'
                    >
                        Book Now
                    </button>
                </div>
            </div>
            `;
        });
    } catch (error) {
        console.log(error);
        results.innerHTML = `<h3>Failed to fetch trains. Make sure backend is running.</h3>`;
    }
});

function bookTrain(train, quota, tatkalCharge) {
    localStorage.setItem("selectedTrain", JSON.stringify(train));
    localStorage.setItem("selectedQuota", quota || "General");
    localStorage.setItem("tatkalCharge", tatkalCharge || 0);

    window.location.href = "book-ticket.html";
}