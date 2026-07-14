const Train = require("../models/Train");

const routes = {

    "Delhi-Mumbai": [

        "Delhi",
        "Mathura",
        "Kota",
        "Ratlam",
        "Vadodara",
        "Surat",
        "Mumbai"

    ],

    "Indore-Bhopal": [

        "Indore",
        "Dewas",
        "Ujjain",
        "Shujalpur",
        "Sehore",
        "Bhopal"

    ],

    "Jaipur-Delhi": [

        "Jaipur",
        "Alwar",
        "Rewari",
        "Gurgaon",
        "Delhi"

    ],

    "Chennai-Bangalore": [

        "Chennai",
        "Arakkonam",
        "Katpadi",
        "Jolarpettai",
        "Bangarpet",
        "Bangalore"

    ]

};

const getRoute = (from, to) => {

    const key = `${from}-${to}`;

    if (routes[key]) {

        return routes[key];

    }

    return [

        from,
        "Station A",
        "Station B",
        "Station C",
        to

    ];

};

const getLiveStatus = async (req, res) => {

    try {

        const { trainNumber } = req.params;

        const train = await Train.findOne({

            trainNumber

        });

        if (!train) {

            return res.status(404).json({

                message: "Train not found"

            });

        }

        const route = getRoute(train.from, train.to);

        const currentIndex = Math.floor(Math.random() * (route.length - 1));

        const delays = [

            "On Time",
            "5 Minutes Late",
            "10 Minutes Late",
            "15 Minutes Late"

        ];

        res.json({

            trainName: train.trainName,

            trainNumber: train.trainNumber,

            currentStation: route[currentIndex],

            nextStation: route[currentIndex + 1],

            delay: delays[Math.floor(Math.random() * delays.length)],

            updatedAt: new Date().toLocaleTimeString([], {

                hour: "2-digit",

                minute: "2-digit"

            })

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

module.exports = {

    getLiveStatus

};