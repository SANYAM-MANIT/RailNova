const email = localStorage.getItem("resetEmail");

if (!email) {

    window.location.href = "forgot-password.html";

}

document
.getElementById("resetBtn")
.addEventListener("click", async () => {

    const newPassword =
    document.getElementById("password").value.trim();

    if (newPassword.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }

    const response = await fetch(

        "https://railnova.onrender.com/api/auth/reset-password",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                newPassword

            })

        }

    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {

        localStorage.removeItem("resetEmail");

        window.location.href = "login.html";

    }

});