document
.getElementById("sendOtpBtn")
.addEventListener("click", async () => {

    const email =
    document.getElementById("email").value.trim();

    if(!email){

        alert("Enter your email");

        return;

    }

    const response = await fetch(
        "http://localhost:8080/api/auth/forgot-password",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        }
    );

    const data = await response.json();

    alert(data.message);

    if(response.ok){

        localStorage.setItem("resetEmail",email);

        window.location.href = "verify-forgot-otp.html";

    }

});