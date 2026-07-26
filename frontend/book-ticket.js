const train = JSON.parse(localStorage.getItem("selectedTrain"));

if (!train) {
    alert("No train selected");
    window.location.href = "train-search.html";
}

const selectedQuota = localStorage.getItem("selectedQuota") || "General";
const tatkalChargePerPass = Number(localStorage.getItem("tatkalCharge")) || 0;

document.getElementById("trainName").textContent = train.trainName + (selectedQuota !== "General" ? ` (${selectedQuota} Quota)` : "");
document.getElementById("trainNumber").textContent = train.trainNumber;
document.getElementById("from").textContent = train.from;
document.getElementById("to").textContent = train.to;

const warning = document.getElementById("concessionWarning");
const passengersContainer = document.getElementById("passengersContainer");
const addPassengerBtn = document.getElementById("addPassengerBtn");

function checkConcessionWarning() {
    const concessions = passengersContainer.querySelectorAll(".pass-concession");
    let showWarning = false;
    concessions.forEach(c => {
        if (c.value !== "None") showWarning = true;
    });
    warning.style.display = showWarning ? "block" : "none";
}

// Initial listener for passenger 1
const primaryConcession = passengersContainer.querySelector(".pass-concession");
if (primaryConcession) {
    primaryConcession.addEventListener("change", checkConcessionWarning);
}

let passengerCount = 1;

// Add Passenger Handler (Max 6)
addPassengerBtn.addEventListener("click", () => {
    if (passengerCount >= 6) {
        alert("Maximum 6 passengers allowed per booking ticket.");
        return;
    }

    passengerCount++;

    const card = document.createElement("div");
    card.className = "passenger-card";
    card.setAttribute("data-index", passengerCount);

    card.innerHTML = `
        <div class="passenger-card-header">
            <h3>👤 Passenger ${passengerCount}</h3>
            <button type="button" class="remove-passenger-btn">&times; Remove</button>
        </div>

        <div class="input-box">
            <label>Passenger Name</label>
            <input type="text" class="pass-name" placeholder="Enter Passenger Name" required>
        </div>

        <div class="input-box">
            <label>Age</label>
            <input type="number" class="pass-age" placeholder="Enter Age" required>
        </div>

        <div class="input-box">
            <label>Gender</label>
            <select class="pass-gender">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </div>

        <div class="input-box">
            <label>Berth Preference</label>
            <select class="pass-berth">
                <option>Lower</option>
                <option>Middle</option>
                <option>Upper</option>
                <option>Side Lower</option>
                <option>Side Upper</option>
                <option>Window</option>
            </select>
        </div>

        <div class="input-box">
            <label>Concession Type</label>
            <select class="pass-concession">
                <option value="None">No Concession</option>
                <option value="Senior Citizen">Senior Citizen (40% Off)</option>
                <option value="PWD">Person with Disability (PWD 50% Off)</option>
            </select>
        </div>
    `;

    passengersContainer.appendChild(card);

    const concessionSelect = card.querySelector(".pass-concession");
    concessionSelect.addEventListener("change", checkConcessionWarning);

    // Remove passenger handler
    const removeBtn = card.querySelector(".remove-passenger-btn");
    removeBtn.addEventListener("click", () => {
        card.remove();
        passengerCount--;
        updatePassengerIndices();
        checkConcessionWarning();
    });
});

function updatePassengerIndices() {
    const cards = passengersContainer.querySelectorAll(".passenger-card");
    cards.forEach((card, idx) => {
        const header = card.querySelector("h3");
        if (idx === 0) {
            header.textContent = "👤 Passenger 1 (Primary)";
        } else {
            header.textContent = `👤 Passenger ${idx + 1}`;
        }
    });
}

// Form Submit Handler
const form = document.getElementById("bookingForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const passengerCards = passengersContainer.querySelectorAll(".passenger-card");
    const passengers = [];
    const baseFarePerPassenger = train.fare;
    
    let totalOriginalFare = 0;
    let totalDiscount = 0;
    let totalTatkalCharges = 0;
    const usedConcessions = new Set();

    passengerCards.forEach(card => {
        const name = card.querySelector(".pass-name").value.trim();
        const age = card.querySelector(".pass-age").value.trim();
        const gender = card.querySelector(".pass-gender").value;
        const berth = card.querySelector(".pass-berth").value;
        const concessionType = card.querySelector(".pass-concession").value;

        if (name && age) {
            const passOriginalFare = baseFarePerPassenger + tatkalChargePerPass;
            let passDiscount = 0;

            if (concessionType === "Senior Citizen") {
                passDiscount = Math.round(baseFarePerPassenger * 0.40);
                usedConcessions.add("Senior Citizen");
            } else if (concessionType === "PWD") {
                passDiscount = Math.round(baseFarePerPassenger * 0.50);
                usedConcessions.add("PWD");
            }

            totalOriginalFare += passOriginalFare;
            totalDiscount += passDiscount;
            totalTatkalCharges += tatkalChargePerPass;

            passengers.push({
                name,
                age: Number(age),
                gender,
                berth,
                concessionType,
                discount: passDiscount
            });
        }
    });

    if (passengers.length === 0) {
        alert("Please enter at least one passenger detail.");
        return;
    }

    const finalFare = totalOriginalFare - totalDiscount;
    const primaryPass = passengers[0];
    const overallConcessionType = Array.from(usedConcessions).join(", ") || "None";

    const bookingData = {
        trainId: train._id,
        passengerName: primaryPass.name,
        age: primaryPass.age,
        gender: primaryPass.gender,
        berth: primaryPass.berth,
        passengers: passengers,
        coach: document.getElementById("coach").value,
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        concessionType: overallConcessionType,
        quota: selectedQuota,
        tatkalCharges: totalTatkalCharges,
        originalFare: totalOriginalFare,
        discount: totalDiscount,
        fare: finalFare
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    window.location.href = "payment.html";
});