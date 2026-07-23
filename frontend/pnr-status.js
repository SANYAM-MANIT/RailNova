async function checkPNR() {

    const pnr = document.getElementById("pnrInput").value.trim();

    if (pnr.length !== 10) {

        alert("Please enter a valid 10-digit PNR Number");

        return;

    }

    try {

        const response = await fetch(

            `https://railnova.onrender.com/api/bookings/pnr/${pnr}`

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            document.getElementById("result").style.display = "none";

            return;

        }

        document.getElementById("passenger").textContent = data.passengerName;

        document.getElementById("train").textContent = data.trainName;

        document.getElementById("trainNumber").textContent = data.trainNumber;

        document.getElementById("route").textContent = `${data.from} → ${data.to}`;

        document.getElementById("coach").textContent = `${data.coachNumber} (${data.coach})`;

        document.getElementById("seat").textContent = `${data.seatNumber} (${data.berth})`;

        document.getElementById("pnr").textContent = data.pnr;

        document.getElementById("status").textContent = data.status;

        const status = document.getElementById("status");

        status.className = "";

        if (data.status === "Confirmed") {

            status.classList.add("confirmed");

        }

        document.getElementById("result").style.display = "block";

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}