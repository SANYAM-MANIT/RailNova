const fs = require("fs");

const cities = [
  "New Delhi","Mumbai Central","CSMT Mumbai","Bhopal Jn","Indore Jn",
  "Jaipur","Ahmedabad","Surat","Vadodara","Lucknow","Kanpur",
  "Prayagraj","Varanasi","Patna","Ranchi","Nagpur","Pune",
  "Hyderabad","Secunderabad","Chennai Central","Bengaluru",
  "Mysuru","Kochi","Thiruvananthapuram","Madurai","Coimbatore",
  "Visakhapatnam","Vijayawada","Bhubaneswar","Cuttack",
  "Raipur","Bilaspur","Jabalpur","Gwalior","Agra",
  "Chandigarh","Jammu Tawi","Amritsar","Dehradun","Haridwar",
  "Guwahati","Dibrugarh","Siliguri","Howrah","Kolkata"
];

const trainTypes = [
  "Rajdhani Express",
  "Shatabdi Express",
  "Vande Bharat Express",
  "Duronto Express",
  "Humsafar Express",
  "Garib Rath",
  "Superfast Express",
  "Intercity Express",
  "Mail Express",
  "Jan Shatabdi",
  "Sampark Kranti Express",
  "Tejas Express"
];

function random(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function time(){

    const h=Math.floor(Math.random()*24);

    const m=[0,5,10,15,20,25,30,35,40,45,50,55][Math.floor(Math.random()*12)];

    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}

function duration(){

    const h=Math.floor(Math.random()*18)+2;

    const m=[0,15,30,45][Math.floor(Math.random()*4)];

    return `${h}h ${m}m`;
}

const trains=[];

for(let i=0;i<300;i++){

    let from=random(cities);

    let to=random(cities);

    while(to===from){

        to=random(cities);

    }

    const dep=time();

    const arr=time();

    const seats=Math.floor(Math.random()*400)+300;

    const available=Math.floor(Math.random()*seats);

    const fare=Math.floor(Math.random()*2500)+250;

    trains.push({

        trainNumber:String(12001+i),

        trainName:`${from.split(" ")[0]} ${random(trainTypes)}`,

        from,

        to,

        departure:dep,

        arrival:arr,

        duration:duration(),

        totalSeats:seats,

        availableSeats:available,

        fare,

        __v:0

    });

}

fs.writeFileSync("./data/trains.json",JSON.stringify(trains,null,2));

console.log("✅ 300 Premium Trains Generated Successfully!");