const email = localStorage.getItem("resetEmail");

if (!email) {

    window.location.href = "forgot-password.html";

}

document
.getElementById("verifyBtn")
.addEventListener("click", async () => {

    const otp =
    document.getElementById("otp").value.trim();

    if (!otp) {

        alert("Enter OTP");

        return;

    }

    const response = await fetch(

        "https://railnova.onrender.com/api/auth/verify-forgot-otp",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                otp

            })

        }

    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {

        window.location.href = "reset-password.html";

    }

});