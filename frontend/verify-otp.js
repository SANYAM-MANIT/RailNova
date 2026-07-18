const email = localStorage.getItem("pendingEmail");

if (!email) {

    alert("No signup request found.");

    window.location.href = "signup.html";

}

document.getElementById("otpForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const otp = document.getElementById("otp").value;

    try {

        const response = await fetch(

            "http://localhost:8080/api/auth/verify-otp",

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

        if (response.ok) {

            localStorage.removeItem("pendingEmail");

            alert("✅ Email verified successfully! Please login.");

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

});

let seconds = 30;

const timer = document.getElementById("timer");
const countdown = document.getElementById("countdown");
const resendBtn = document.getElementById("resendBtn");

const interval = setInterval(() => {

    seconds--;

    countdown.textContent = seconds;

    if(seconds<=0){

        clearInterval(interval);

        timer.style.display="none";

        resendBtn.style.display="block";

    }

},1000);

resendBtn.addEventListener("click",async()=>{

    const email=localStorage.getItem("pendingEmail");

    const response=await fetch(
        "http://localhost:8080/api/auth/resend-otp",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        }
    );

    const data=await response.json();

    alert(data.message);

    location.reload();

});