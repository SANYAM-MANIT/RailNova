const btn = document.getElementById("checkBtn");

btn.addEventListener("click", async () => {

    const trainNumber =
        document.getElementById("trainNumber").value.trim();

    if (!trainNumber) {

        alert("Enter Train Number");

        return;

    }

    try {

        const response = await fetch(

            `https://railnova.onrender.com/api/live-status/${trainNumber}`

        );

        const data = await response.json();

        const result =
            document.getElementById("result");

        if (response.status !== 200) {

            result.innerHTML = `

                <h2 style="margin-top:30px;color:red;text-align:center">

                    Train Not Found

                </h2>

            `;

            return;

        }

        result.innerHTML = `

            <div class="card">

                <div class="train">

                    <h2>

                        ${data.trainName}

                    </h2>

                    <p>

                        Train No. ${data.trainNumber}

                    </p>

                </div>

                <div class="row">

                    <span>

                        📍 Current Station

                    </span>

                    <strong>

                        ${data.currentStation}

                    </strong>

                </div>

                <div class="row">

                    <span>

                        ➜ Next Station

                    </span>

                    <strong>

                        ${data.nextStation}

                    </strong>

                </div>

                <div class="row">

                    <span>

                        ⏱ Delay

                    </span>

                    <strong class="${data.delay === "On Time" ? "green" : "red"}">

                        ${data.delay}

                    </strong>

                </div>

                <div class="row">

                    <span>

                        🕒 Last Updated

                    </span>

                    <strong>

                        ${data.updatedAt}

                    </strong>

                </div>

            </div>

        `;

    }

    catch (error) {

        console.log(error);

    }

});