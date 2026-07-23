const token = localStorage.getItem("token");

const bookingsDiv = document.getElementById("bookings");

async function loadBookings() {

    try {

        const response = await fetch(

            "https://railnova.onrender.com/api/bookings/my",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const bookings = await response.json();

        bookingsDiv.innerHTML = "";

        if (bookings.length === 0) {

            bookingsDiv.innerHTML = "<h2>No Bookings Found</h2>";

            return;

        }

        bookings.forEach(booking => {

            bookingsDiv.innerHTML += `

            <div class="booking-card">

                <div class="booking-top">

                    <h2>${booking.trainName}</h2>

                    <span class="status"

                    style="background:${booking.status==="Confirmed"?"#22c55e":"#ef4444"}">

                        ${booking.status}

                    </span>

                </div>

                <div class="info">

                    <p><strong>PNR:</strong> ${booking.pnr}</p>

                    <p><strong>Train No:</strong> ${booking.trainNumber}</p>

                    <p><strong>Passenger:</strong> ${booking.passengerName}</p>

                    <p><strong>Route:</strong> ${booking.from} → ${booking.to}</p>

                    <p><strong>Coach:</strong> ${booking.coachNumber}</p>

                    <p><strong>Seat:</strong> ${booking.seatNumber}</p>

                    <p><strong>Berth:</strong> ${booking.berth}</p>

                </div>

                <div class="buttons">

                    <button

                        class="view"

                        onclick='viewTicket(${JSON.stringify(booking)})'

                    >

                        View Ticket

                    </button>

                    ${booking.status==="Confirmed" ? `

                    <button

                        class="cancel"

                        onclick="cancelBooking('${booking._id}')"

                    >

                        Cancel Ticket

                    </button>

                    ` : `

                    <button

                        class="cancel"

                        disabled

                    >

                        Cancelled

                    </button>

                    `}

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

async function cancelBooking(id){

    const confirmCancel = confirm(

        "Are you sure you want to cancel this ticket?"

    );

    if(!confirmCancel){

        return;

    }

    try{

        const response = await fetch(

            `https://railnova.onrender.com/api/bookings/cancel/${id}`,

            {

                method:"PUT",

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        alert(data.message);

        loadBookings();

    }

    catch(error){

        console.log(error);

    }

}

function viewTicket(booking){

    localStorage.setItem(

        "booking",

        JSON.stringify(booking)

    );

    window.location.href="ticket.html";

}

loadBookings();