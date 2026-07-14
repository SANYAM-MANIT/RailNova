const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const button = form.querySelector("button");

    button.innerText = "Creating Account...";
    button.disabled = true;

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            showToast("📩 OTP sent to your email.", "success");

            localStorage.setItem("pendingEmail", email);

            setTimeout(() => {

                window.location.href = "verify-otp.html";

            }, 1500);

        }

        else {

            showToast(data.message, "error");

        }

    }

    catch (error) {

        console.log(error);

        showToast("Backend server is not running.", "error");

    }

    button.innerText = "Create Account";

    button.disabled = false;

});