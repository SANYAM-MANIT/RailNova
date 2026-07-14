const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

try {

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "admin") {

        alert("Access Denied");

        window.location.href = "dashboard.html";

    }

} catch (e) {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}

const form = document.getElementById("trainForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const body = {

        trainName: document.getElementById("trainName").value.trim(),

        trainNumber: document.getElementById("trainNumber").value.trim(),

        from: document.getElementById("from").value.trim(),

        to: document.getElementById("to").value.trim(),

        departure: document.getElementById("departure").value,

        arrival: document.getElementById("arrival").value,

        totalSeats: Number(document.getElementById("totalSeats").value),

        fare: Number(document.getElementById("fare").value)

    };

    console.log("Sending Data:", body);

    try {

        const response = await fetch(
            "http://localhost:8080/api/admin/add-train",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("🚆 Train Added Successfully!");

            window.location.href = "manage-trains.html";

        } else {

            alert(data.message || "Unable to add train.");

        }

    } catch (error) {

        console.log(error);

        alert("Server Error. Check backend.");

    }

});