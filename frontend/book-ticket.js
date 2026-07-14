const train = JSON.parse(localStorage.getItem("selectedTrain"));

if (!train) {

    alert("No train selected");

    window.location.href = "train-search.html";

}

document.getElementById("trainName").textContent = train.trainName;
document.getElementById("trainNumber").textContent = train.trainNumber;
document.getElementById("from").textContent = train.from;
document.getElementById("to").textContent = train.to;

const concession = document.getElementById("concession");

const warning = document.getElementById("concessionWarning");

const concessionSelect = document.getElementById("concession");

concession.addEventListener("change", () => {

    if (concession.value === "None") {

        warning.style.display = "none";

    }

    else {

        warning.style.display = "block";

    }

});

const form = document.getElementById("bookingForm");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    let originalFare = train.fare;

    let discount = 0;

    let finalFare = originalFare;

    if(concessionSelect.value==="Senior Citizen"){

        discount = Math.round(originalFare * 0.40);

        finalFare = originalFare - discount;

    }

    else if(concessionSelect.value==="PWD"){

        discount = Math.round(originalFare * 0.50);

        finalFare = originalFare - discount;

    }

    const bookingData={

        trainId:train._id,

        passengerName:document.getElementById("name").value,

        age:document.getElementById("age").value,

        gender:document.getElementById("gender").value,

        coach:document.getElementById("coach").value,

        berth:document.getElementById("berth").value,

        mobile:document.getElementById("mobile").value,

        email:document.getElementById("email").value,

        concessionType:concessionSelect.value,

        originalFare:originalFare,

        discount:discount,

        fare:finalFare

    };

    localStorage.setItem(

        "bookingData",

        JSON.stringify(bookingData)

    );

    window.location.href="payment.html";

});