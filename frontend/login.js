const form = document.getElementById("loginForm");

const togglePassword = document.getElementById("togglePassword");

const password = document.getElementById("password");

togglePassword.addEventListener("click",()=>{

    if(password.type==="password"){

        password.type="text";

        togglePassword.classList.remove("fa-eye");

        togglePassword.classList.add("fa-eye-slash");

    }

    else{

        password.type="password";

        togglePassword.classList.remove("fa-eye-slash");

        togglePassword.classList.add("fa-eye");

    }

});

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const email=document.getElementById("email").value.trim();

    const pass=password.value.trim();

    try{

        const response=await fetch("https://railnova.onrender.com/api/auth/login",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email,

                password:pass

            })

        });

        const data=await response.json();

        if(response.ok){

            localStorage.setItem("token",data.token);

            showToast("🎉 Welcome back to RailNova!","success");

            if(data.user.role==="admin"){

                window.location.href="admin-dashboard.html";
            
            }
            
            else{
            
                window.location.href="dashboard.html";
            
            }

        }

        else{

            showToast(data.message,"error");

        }

    }

    catch(error){

        showToast("Backend server is not running.","error");

    }

});

// Google Login Demo Notice
const googleBtn = document.querySelector(".google-btn");

if(googleBtn){

    googleBtn.addEventListener("click", (e) => {

        e.preventDefault();

        showToast("ℹ️ Google Sign-In is in demo mode. Please log in with your email & password.", "error");

    });

}