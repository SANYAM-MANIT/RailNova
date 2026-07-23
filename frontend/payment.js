const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const train = JSON.parse(localStorage.getItem("selectedTrain"));

const bookingData = JSON.parse(localStorage.getItem("bookingData"));

if (!train || !bookingData) {

    alert("Booking details not found.");

    window.location.href = "train-search.html";

}

document.getElementById("trainName").textContent = train.trainName;

document.getElementById("trainNumber").textContent = train.trainNumber;

document.getElementById("route").textContent = train.from + " → " + train.to;

document.getElementById("originalFare").textContent =
    "₹" + bookingData.originalFare;

document.getElementById("concessionType").textContent =
    bookingData.concessionType;

document.getElementById("discount").textContent =
    "- ₹" + bookingData.discount;

document.getElementById("amount").textContent =
    "₹" + bookingData.fare;

const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", async () => {

    payBtn.disabled = true;

    payBtn.innerHTML = "⏳ Processing Payment...";

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {

        const paymentMethod =
            document.querySelector('input[name="payment"]:checked').value;

        bookingData.paymentMethod = paymentMethod;

        const response = await fetch(

            "http://localhost:8080/api/bookings/book",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(bookingData)

            }

        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem(

                "booking",

                JSON.stringify(data.booking)

            );

            alert("✅ Payment Successful!");

            window.location.href = "ticket.html";

        }

        else {

            payBtn.disabled = false;

            payBtn.innerHTML = "Pay Now";

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        payBtn.disabled = false;

        payBtn.innerHTML = "Pay Now";

        alert("Payment Failed");

    }

});