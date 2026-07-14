const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", async () => {

    const from = document.getElementById("from").value.trim();

    const to = document.getElementById("to").value.trim();

    const results = document.getElementById("results");

    if (!from || !to) {

        alert("Enter Source and Destination");

        return;

    }

    try {

        const response = await fetch(`http://localhost:8080/api/trains/search?from=${from}&to=${to}`);

        const trains = await response.json();

        results.innerHTML = "";

        if (trains.length === 0) {

            results.innerHTML = `
                <h3>No Trains Found</h3>
            `;

            return;

        }

        trains.forEach(train => {

            results.innerHTML += `
        
            <div class="train-card">
        
                <div class="train-info">
        
                    <h2>${train.trainName}</h2>
        
                    <p>Train No. ${train.trainNumber}</p>
        
                </div>
        
                <div class="journey">
        
                    <div class="station">
        
                        <h3>${train.departure}</h3>
        
                        <span>${train.from}</span>
        
                    </div>
        
                    <div class="journey-line">
        
                        <span class="line"></span>
        
                        <small>${train.duration}</small>
        
                    </div>
        
                    <div class="station">
        
                        <h3>${train.arrival}</h3>
        
                        <span>${train.to}</span>
        
                    </div>
        
                </div>
        
                <div class="train-extra">
        
                    <div class="available">
        
                        ${train.availableSeats} Seats
        
                    </div>
        
                    <button
                        class="book-btn"
                        onclick='bookTrain(${JSON.stringify(train)})'
                    >
        
                        Book Now
        
                    </button>
        
                </div>
        
            </div>
        
            `;
        
        });

    }

    catch (error) {

        console.log(error);

    }

});

function bookTrain(train){

    localStorage.setItem(
        "selectedTrain",
        JSON.stringify(train)
    );

    window.location.href="book-ticket.html";

}