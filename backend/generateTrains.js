const fs = require("fs");
const path = require("path");

const stations = [
    "Ujjain", "Ujjain Jn", "Delhi", "New Delhi", "Mumbai", "Mumbai Central", "CSMT Mumbai", 
    "Bhopal", "Bhopal Jn", "Indore", "Indore Jn", "Jaipur", 
    "Ahmedabad", "Surat", "Vadodara", "Lucknow", "Kanpur", 
    "Prayagraj", "Varanasi", "Patna", "Ranchi", "Nagpur", "Pune", 
    "Hyderabad", "Secunderabad", "Chennai", "Chennai Central", 
    "Bengaluru", "Mysuru", "Kochi", "Thiruvananthapuram", "Madurai", 
    "Coimbatore", "Visakhapatnam", "Vijayawada", "Bhubaneswar", "Cuttack", 
    "Raipur", "Bilaspur", "Jabalpur", "Gwalior", "Agra", 
    "Chandigarh", "Jammu Tawi", "Amritsar", "Dehradun", "Haridwar", 
    "Guwahati", "Dibrugarh", "Siliguri", "Howrah", "Kolkata"
];

const trainTypes = [
    "Rajdhani Express",
    "Shatabdi Express",
    "Vande Bharat Express",
    "Mahakal Express",
    "Duronto Express",
    "Humsafar Express",
    "Garib Rath Express",
    "Superfast Express",
    "Intercity Express",
    "Mail Express",
    "Jan Shatabdi",
    "Sampark Kranti Express",
    "Tejas Express"
];

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function time() {
    const h = Math.floor(Math.random() * 24);
    const m = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(Math.random() * 12)];
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function duration() {
    const h = Math.floor(Math.random() * 18) + 2;
    const m = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    return `${h}h ${m}m`;
}

const trains = [];

// Popular real trains & famous Ujjain Mahakal trains first
const famousTrains = [
    // Ujjain Special Trains
    { trainNumber: "20413", trainName: "Kashi Mahakal Superfast Express", from: "Varanasi", to: "Ujjain", departure: "14:45", arrival: "06:40", duration: "15h 55m", totalSeats: 300, availableSeats: 88, fare: 1650 },
    { trainNumber: "20414", trainName: "Kashi Mahakal Superfast Express", from: "Ujjain", to: "Varanasi", departure: "17:15", arrival: "09:00", duration: "15h 45m", totalSeats: 300, availableSeats: 72, fare: 1650 },
    { trainNumber: "12961", trainName: "Avantika Express", from: "Mumbai", to: "Ujjain", departure: "20:55", arrival: "07:30", duration: "10h 35m", totalSeats: 350, availableSeats: 95, fare: 1320 },
    { trainNumber: "12962", trainName: "Avantika Express", from: "Ujjain", to: "Mumbai", departure: "18:55", arrival: "06:10", duration: "11h 15m", totalSeats: 350, availableSeats: 60, fare: 1320 },
    { trainNumber: "12919", trainName: "Malwa Express", from: "Ujjain", to: "Delhi", departure: "14:00", arrival: "04:15", duration: "14h 15m", totalSeats: 400, availableSeats: 110, fare: 1250 },
    { trainNumber: "12920", trainName: "Malwa Express", from: "Delhi", to: "Ujjain", departure: "19:15", arrival: "09:30", duration: "14h 15m", totalSeats: 400, availableSeats: 85, fare: 1250 },
    { trainNumber: "19303", trainName: "Bhopal - Ujjain Intercity Express", from: "Bhopal", to: "Ujjain", departure: "06:15", arrival: "10:10", duration: "3h 55m", totalSeats: 250, availableSeats: 120, fare: 320 },
    { trainNumber: "19304", trainName: "Ujjain - Bhopal Intercity Express", from: "Ujjain", to: "Bhopal", departure: "16:40", arrival: "20:30", duration: "3h 50m", totalSeats: 250, availableSeats: 90, fare: 320 },
    { trainNumber: "18234", trainName: "Narmada Express", from: "Bilaspur", to: "Ujjain", departure: "11:45", arrival: "09:20", duration: "21h 35m", totalSeats: 300, availableSeats: 70, fare: 1150 },

    // National Famous Trains
    { trainNumber: "12951", trainName: "Mumbai Rajdhani Express", from: "Delhi", to: "Mumbai", departure: "16:55", arrival: "08:35", duration: "15h 40m", totalSeats: 300, availableSeats: 82, fare: 2150 },
    { trainNumber: "12952", trainName: "Mumbai Rajdhani Express", from: "Mumbai", to: "Delhi", departure: "17:00", arrival: "08:30", duration: "15h 30m", totalSeats: 300, availableSeats: 65, fare: 2150 },
    { trainNumber: "12001", trainName: "Bhopal Shatabdi Express", from: "Delhi", to: "Bhopal", departure: "06:00", arrival: "14:25", duration: "8h 25m", totalSeats: 250, availableSeats: 72, fare: 1450 },
    { trainNumber: "12002", trainName: "Bhopal Shatabdi Express", from: "Bhopal", to: "Delhi", departure: "15:30", arrival: "23:50", duration: "8h 20m", totalSeats: 250, availableSeats: 58, fare: 1450 },
    { trainNumber: "22436", trainName: "Vande Bharat Express", from: "Delhi", to: "Varanasi", departure: "06:00", arrival: "14:00", duration: "8h 00m", totalSeats: 200, availableSeats: 94, fare: 1750 },
    { trainNumber: "22435", trainName: "Vande Bharat Express", from: "Varanasi", to: "Delhi", departure: "15:00", arrival: "23:00", duration: "8h 00m", totalSeats: 200, availableSeats: 81, fare: 1750 },
    { trainNumber: "12627", trainName: "Karnataka Express", from: "Delhi", to: "Bengaluru", departure: "20:20", arrival: "08:40", duration: "36h 20m", totalSeats: 400, availableSeats: 110, fare: 1890 },
    { trainNumber: "12925", trainName: "Paschim Express", from: "Mumbai", to: "Amritsar", departure: "11:25", arrival: "18:30", duration: "31h 05m", totalSeats: 350, availableSeats: 84, fare: 1650 },
    { trainNumber: "12417", trainName: "Prayagraj Express", from: "Delhi", to: "Prayagraj", departure: "22:10", arrival: "07:00", duration: "8h 50m", totalSeats: 300, availableSeats: 90, fare: 1120 },
    { trainNumber: "12953", trainName: "August Kranti Rajdhani", from: "Delhi", to: "Mumbai", departure: "17:15", arrival: "09:45", duration: "16h 30m", totalSeats: 300, availableSeats: 45, fare: 2100 }
];

trains.push(...famousTrains);

// Generate 1,500+ trains including Ujjain routes
for (let i = 0; i < 1500; i++) {
    let from = random(stations);
    let to = random(stations);

    while (to === from) {
        to = random(stations);
    }

    const seats = Math.floor(Math.random() * 300) + 150;
    const available = Math.floor(Math.random() * (seats - 20)) + 15;
    const fare = Math.floor(Math.random() * 2200) + 350;

    trains.push({
        trainNumber: String(13000 + i),
        trainName: `${from.split(" ")[0]} - ${to.split(" ")[0]} ${random(trainTypes)}`,
        from,
        to,
        departure: time(),
        arrival: time(),
        duration: duration(),
        totalSeats: seats,
        availableSeats: available,
        fare
    });
}

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, "trains.json"), JSON.stringify(trains, null, 2));

console.log(`✅ Generated ${trains.length} Trains (including Ujjain routes) into backend/data/trains.json!`);