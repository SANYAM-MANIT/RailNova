const token = localStorage.getItem("token");

if(!token){

    window.location.href = "login.html";

}

const payload = JSON.parse(atob(token.split(".")[1]));

if(payload.role !== "admin"){

    alert("Access Denied");

    window.location.href = "dashboard.html";

}

async function loadDashboard(){

    try{

        const response=await fetch(

            "https://railnova.onrender.com/api/admin/dashboard",

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const data=await response.json();

        if(!response.ok){

            alert(data.message);

            window.location.href="dashboard.html";

            return;

        }

        document.getElementById("users").textContent=data.totalUsers;

        document.getElementById("trains").textContent=data.totalTrains;

        document.getElementById("bookings").textContent=data.totalBookings;

        document.getElementById("cancelled").textContent=data.cancelledBookings;

        const analyticsResponse = await fetch(

            "https://railnova.onrender.com/api/admin/analytics",
        
            {
        
                headers:{
        
                    Authorization:`Bearer ${token}`
        
                }
        
            }
        
        );
        
        const analytics = await analyticsResponse.json();
        
        document.getElementById("revenue").textContent =
        "₹"+analytics.totalRevenue;
        
        document.getElementById("confirmed").textContent =
        analytics.confirmedBookings;
        
        document.getElementById("today").textContent =
        analytics.todayBookings;
        
        document.getElementById("routes").textContent =
        analytics.popularRoutes.length;
        
        const recent=document.getElementById("recentBookings");
        
        recent.innerHTML="";
        
        analytics.recentBookings.forEach(b=>{
        
        recent.innerHTML+=`
        
        <tr>
        
        <td>${b.passengerName}</td>
        
        <td>${b.trainName}</td>
        
        <td>₹${b.fare}</td>
        
        </tr>
        
        `;
        
        });
        
        const routes=document.getElementById("popularRoutes");

        routes.innerHTML="";
        
        analytics.popularRoutes.forEach(route=>{
        
            routes.innerHTML += `
            <div>
        
                <span>🚆 ${route._id.from} → ${route._id.to}</span>
        
                <strong>${route.count}</strong>
        
            </div>
            `;
        
        });


        new Chart(document.getElementById("bookingChart"),{

            type:"bar",
            
            data:{
            
            labels:["Confirmed","Cancelled","Today"],
            
            datasets:[{
            
            data:[
            
            analytics.confirmedBookings,
            
            analytics.cancelledBookings,
            
            analytics.todayBookings
            
            ]
            
            }]
            
            },
            
            options:{
            
            responsive:true,
            
            plugins:{
            
            legend:{
            
            display:false
            
            }
            
            }
            
            }
            
            });
            
            new Chart(document.getElementById("statusChart"),{
            
            type:"pie",
            
            data:{
            
            labels:["Confirmed","Cancelled"],
            
            datasets:[{
            
            data:[
            
            analytics.confirmedBookings,
            
            analytics.cancelledBookings
            
            ]
            
            }]
            
            },
            
            options:{
            
            responsive:true
            
            }
            
            });

    }

    catch(error){

        console.log(error);

    }

}

document.getElementById("logoutBtn").onclick=()=>{

    localStorage.removeItem("token");

    window.location.href="login.html";

}

loadDashboard();


const menuBtn=document.getElementById("menuBtn");

const sidebar=document.getElementById("sidebar");

const overlay=document.getElementById("overlay");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.add("show");

        overlay.classList.add("show");

    });

}

overlay.addEventListener("click",()=>{

    sidebar.classList.remove("show");

    overlay.classList.remove("show");

});