const token = localStorage.getItem("token");

if(!token){

    window.location.href = "login.html";

}

async function loadProfile(){

    try{

        const response = await fetch(

            "http://localhost:8080/api/auth/profile",

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const user = await response.json();

        if(!response.ok){

            alert(user.message);

            window.location.href="login.html";

            return;

        }

        document.getElementById("name").textContent = user.name;

        document.getElementById("email").textContent = user.email;

        document.getElementById("userId").textContent = user._id;

        document.getElementById("joined").textContent =
        new Date(user.createdAt).toLocaleDateString();

        const initials = user.name
.trim()
.split(" ")
.map(word => word[0])
.slice(0,2)
.join("")
.toUpperCase();

document.getElementById("avatar").textContent = initials;

    }

    catch(error){

        console.log(error);

        alert("Unable to load profile.");

    }

}

loadProfile();