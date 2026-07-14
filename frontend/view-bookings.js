const token = localStorage.getItem("token");

if(!token){

    window.location.href="login.html";

}

const payload = JSON.parse(atob(token.split(".")[1]));

if(payload.role!=="admin"){

    window.location.href="dashboard.html";

}

const table=document.getElementById("bookingTable");

async function loadBookings(){

    const response=await fetch(

        "http://localhost:8080/api/admin/bookings",

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const bookings=await response.json();

    table.innerHTML="";

    bookings.forEach(booking=>{

        table.innerHTML+=`

        <tr>

        <td>${booking.passengerName}</td>

        <td>${booking.trainName}</td>

        <td>${booking.pnr}</td>

        <td>${booking.from} → ${booking.to}</td>

        <td>${booking.coachNumber}-${booking.seatNumber}</td>

        <td>

        <span class="${booking.status==="Cancelled"?"cancelled":"confirmed"}">

        ${booking.status}

        </span>

        </td>

        </tr>

        `;

    });

}

loadBookings();