const token = localStorage.getItem("token");

const table = document.getElementById("trainTable");

let editId = null;

async function loadTrains(){

    const res = await fetch("http://localhost:8080/api/admin/trains",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    const trains = await res.json();

    table.innerHTML = "";

    trains.forEach(train=>{

        table.innerHTML += `
        <tr>
            <td>${train.trainNumber}</td>
            <td>${train.trainName}</td>
            <td>${train.from} → ${train.to}</td>
            <td>${train.availableSeats}/${train.totalSeats}</td>
            <td>₹${train.fare}</td>
            <td>
                <button onclick='openEdit(${JSON.stringify(train)})'>Edit</button>
                <button class="delete" onclick="deleteTrain('${train._id}')">Delete</button>
            </td>
        </tr>
        `;

    });

}

loadTrains();

function openEdit(train){

    editId = train._id;

    document.getElementById("editName").value = train.trainName;
    document.getElementById("editFrom").value = train.from;
    document.getElementById("editTo").value = train.to;
    document.getElementById("editDeparture").value = train.departure;
    document.getElementById("editArrival").value = train.arrival;
    document.getElementById("editSeats").value = train.totalSeats;
    document.getElementById("editFare").value = train.fare;

    document.getElementById("editModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("editModal").style.display = "none";
}

async function submitEdit(){

    const body = {

        trainName: document.getElementById("editName").value,
        from: document.getElementById("editFrom").value,
        to: document.getElementById("editTo").value,
        departure: document.getElementById("editDeparture").value,
        arrival: document.getElementById("editArrival").value,
        totalSeats: document.getElementById("editSeats").value,
        fare: document.getElementById("editFare").value

    };

    await fetch(`http://localhost:8080/api/admin/train/${editId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(body)
    });

    closeModal();
    loadTrains();
}

async function deleteTrain(id){

    if(!confirm("Delete this train?")) return;

    await fetch(`http://localhost:8080/api/admin/train/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    loadTrains();
}