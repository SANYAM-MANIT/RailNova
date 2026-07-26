const booking = JSON.parse(localStorage.getItem("booking"));

if (!booking) {

    alert("No Ticket Found");

    window.location.href = "dashboard.html";

}

function setValue(id, value) {

    const element = document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}

setValue("pnr", booking.pnr);

setValue("trainName", booking.trainName);

setValue("trainNumber", booking.trainNumber);

if (booking.passengers && booking.passengers.length > 0) {
    const names = booking.passengers.map((p, idx) => {
        const concStr = p.concessionType && p.concessionType !== "None" ? ` [${p.concessionType}]` : "";
        return `${idx + 1}. ${p.name} (${p.age}, ${p.gender})${concStr}`;
    }).join(" | ");
    const seats = booking.passengers.map(p => `${p.coachNumber || booking.coachNumber}-${p.seatNumber}`).join(", ");
    const berths = booking.passengers.map(p => `${p.name.split(" ")[0]}: ${p.berth}`).join(" | ");
    
    setValue("passenger", names);
    setValue("age", `${booking.passengers.length} Passenger(s)`);
    setValue("gender", "Group Booking");
    setValue("seatNumber", seats);
    setValue("berth", berths);
} else {
    setValue("passenger", booking.passengerName);
    setValue("age", booking.age);
    setValue("gender", booking.gender);
    setValue("seatNumber", booking.seatNumber);
    setValue("berth", booking.berth);
}

setValue("from", booking.from);

setValue("to", booking.to);

setValue("status", booking.status);

setValue("quota", booking.quota || "General");

if (booking.quota && booking.quota !== "General") {
    const statusBox = document.querySelector(".status");
    if (statusBox) {
        statusBox.textContent = `⚡ ${booking.quota.toUpperCase()} BOOKING CONFIRMED`;
        statusBox.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
    }
}

setValue("mobile", booking.mobile || "-");

setValue("email", booking.email || "-");

setValue("journeyDate", booking.journeyDate || "-");

setValue("departure", booking.departure || "-");

setValue("arrival", booking.arrival || "-");

// Journey Details

setValue("journeyFare", "₹" + (booking.fare || 0));

// Payment Details

setValue("paymentFare", "₹" + (booking.fare || 0));

setValue("paymentMethod", booking.paymentMethod || "UPI");

setValue("transactionId", booking.transactionId || "-");

setValue("paymentStatus", booking.paymentStatus || "SUCCESS");

setValue("bookingTime", booking.bookingTime || "-");

new QRCode(document.getElementById("qrcode"), {

    text:

`RailNova Ticket

PNR : ${booking.pnr}

Passenger : ${booking.passengerName}

Train : ${booking.trainName}

Coach : ${booking.coachNumber}

Seat : ${booking.seatNumber}

From : ${booking.from}

To : ${booking.to}

Status : ${booking.status}`,

    width: 160,

    height: 160

});

async function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFillColor(37,99,235);

    pdf.rect(0,0,210,30,"F");

    pdf.setTextColor(255,255,255);

    pdf.setFontSize(22);

    pdf.setFont("helvetica","bold");

    pdf.text("RailNova E-Ticket",105,18,{align:"center"});

    pdf.setFontSize(10);

    pdf.text("Travel Smart • Travel Safe",105,25,{align:"center"});

    pdf.setDrawColor(37,99,235);

    pdf.roundedRect(10,38,190,235,4,4);

    pdf.setTextColor(0,0,0);

    pdf.setFontSize(16);

    pdf.setFont("helvetica","bold");

    pdf.text("Passenger Details",15,52);

    pdf.setFont("helvetica","normal");

    pdf.setFontSize(12);

    pdf.text("Passenger",15,63);

    pdf.text(booking.passengerName,70,63);

    pdf.text("Age",15,73);

    pdf.text(String(booking.age),70,73);

    pdf.text("Gender",15,83);

    pdf.text(booking.gender,70,83);

    pdf.text("Mobile",15,93);

    pdf.text(booking.mobile || "-",70,93);

    pdf.text("Email",15,103);

    pdf.text(booking.email || "-",70,103);

    pdf.text("Coach",15,113);

    pdf.text(booking.coachNumber,70,113);

    pdf.text("Seat",15,123);

    pdf.text(String(booking.seatNumber),70,123);

    pdf.text("Berth",15,133);

    pdf.text(booking.berth,70,133);

    pdf.setFont("helvetica","bold");

    pdf.setFontSize(16);

    pdf.text("Journey Details",15,150);

    pdf.setFont("helvetica","normal");

    pdf.setFontSize(12);

    pdf.text("Train",15,161);

    pdf.text(booking.trainName,70,161);

    pdf.text("Train No",15,171);

    pdf.text(booking.trainNumber,70,171);

    pdf.text("From",15,181);

    pdf.text(booking.from,70,181);

    pdf.text("To",15,191);

    pdf.text(booking.to,70,191);

    pdf.text("Journey Date",15,201);

    pdf.text(booking.journeyDate || "-",70,201);

    pdf.text("Departure",15,211);

    pdf.text(booking.departure || "-",70,211);

    pdf.text("Arrival",15,221);

    pdf.text(booking.arrival || "-",70,221);

    pdf.text("Fare Paid",15,231);

    pdf.text("₹" + (booking.fare || 0),70,231);

    pdf.text("Payment",15,241);

    pdf.text(booking.paymentMethod || "UPI",70,241);

    pdf.text("Transaction",15,251);

    pdf.text(booking.transactionId || "-",70,251);

    const qr = document.querySelector("#qrcode canvas");

    if (qr) {

        const img = qr.toDataURL("image/png");

        pdf.addImage(img,"PNG",140,55,45,45);

    }

    pdf.save("RailNova-Ticket.pdf");

}