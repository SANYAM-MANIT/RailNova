const axios = require("axios");
const Train = require("../models/Train");
const Booking = require("../models/Booking");

/**
 * Common Railway Knowledge Base
 */
const KNOWLEDGE_BASE = [
    // Tatkal & Premium Tatkal
    {
        keywords: ["tatkal", "premium tatkal", "emergency booking", "last minute", "tatkal time"],
        response: `⚡ **Tatkal & Premium Tatkal Booking Guide**:
• **Booking Timings**:
  - **AC Classes (1A, 2A, 3A, CC, 3E)**: Opens daily at **10:00 AM** (one day prior to journey).
  - **Non-AC Classes (Sleeper SL, 2S)**: Opens daily at **11:00 AM** (one day prior to journey).
• **RailNova Quotas**:
  - **⚡ Tatkal Quota**: Surcharge of **₹300** applied per passenger.
  - **🔥 Premium Tatkal**: Surcharge of **₹500** with high-priority seat allocation.
• Confirmed Tatkal tickets are marked with a golden **⚡ TATKAL CONFIRMED** status badge on your digital ticket and email!`
    },

    // Group Booking (Multi-Passenger)
    {
        keywords: ["group booking", "multiple passenger", "multi passenger", "how many passenger", "max passenger", "6 passenger", "add passenger"],
        response: `👥 **Multi-Passenger Group Booking**:
• You can book tickets for **up to 6 passengers** in a single booking on RailNova!
• **Contiguous Seat Allocation**: The engine automatically assigns consecutive seats in the same coach bay (e.g. Coach B1, Seats 12, 13, 14).
• **Per-Passenger Concession**: Each passenger can independently select their own concession (Senior Citizen, PWD, or None).
• Your digital ticket and confirmation email will include the complete passenger manifest!`
    },

    // Concessions & Discounts
    {
        keywords: ["concession", "senior citizen", "pwd", "handicap", "disability", "discount", "40%", "50%"],
        response: `🎟️ **RailNova Concession Engine**:
• **Senior Citizen (40% Off)**: Available for male & female passengers aged 60 and above.
• **Person with Disability / PWD (50% Off)**: Available for eligible differently-abled travellers.
• **Important Rule**: Passengers travelling on concession must carry a valid Government-issued identity card or disability certificate during the journey.
• Discounter fares are calculated individually per passenger and clearly itemized on your ticket!`
    },

    // Coach Classes
    {
        keywords: ["coach", "class", "1a", "2a", "3a", "3e", "cc", "sleeper", "sl", "chair car", "first ac", "second ac", "third ac"],
        response: `💺 **Indian Railways Coach Classes Guide**:
• **1A (First AC)**: H1 coach, 2-berth & 4-berth lockable coupés, personalized attendant, top luxury.
• **2A (Second AC)**: A1/A2 coaches, 4 berths per bay + 2 side berths, privacy curtains.
• **3A (Third AC)**: B1-B6 coaches, 6 berths per bay + 2 side berths, fully air-conditioned.
• **3E (AC 3 Economy)**: M1-M3 coaches, modern economical AC travel with 83 berths.
• **CC (AC Chair Car)**: C1/C2 coaches, 3x2 reclining seating (found on Shatabdi, Vande Bharat, Intercity).
• **SL (Sleeper Class)**: S1-S10 coaches, non-AC open window travel with 72 berths.
• **2S (Second Sitting)**: Non-AC reserved bench seating for daytime intercity journeys.`
    },

    // Berth Preferences
    {
        keywords: ["berth", "lower", "middle", "upper", "side lower", "side upper", "window seat"],
        response: `🛏️ **Berth Allocation Preferences**:
• **Lower Berth (LB)**: Ideal for senior citizens and passengers with mobility needs.
• **Middle Berth (MB)**: Foldable daytime berth between lower and upper.
• **Upper Berth (UB)**: Topmost bunk, offers peace and uninterrupted sleep.
• **Side Lower (SL)**: Two-seater window conversion into a single sleeping berth.
• **Side Upper (SU)**: Top bunk along the corridor aisle.`
    },

    // PNR Inquiry
    {
        keywords: ["pnr", "pnr status", "check pnr", "pnr number", "10 digit"],
        response: `🎫 **PNR Status Inquiry**:
• Your PNR (Passenger Name Record) is a unique **10-digit number** generated upon booking.
• To check live status: Click **PNR Status** in the top navigation bar or simply **paste your 10-digit PNR here in chat** and I will look it up for you instantly!`
    },

    // Ticket Booking Process
    {
        keywords: ["how to book", "book ticket", "steps to book", "booking process"],
        response: `🚆 **How to Book on RailNova (4 Easy Steps)**:
1. **Search Trains**: Enter your origin city, destination, and journey date.
2. **Select Quota & Class**: Choose General, ⚡ Tatkal (+₹300), or 🔥 Premium Tatkal (+₹500).
3. **Add Passengers**: Add up to 6 passengers, specify berth preferences and concessions.
4. **Instant Payment**: Confirm payment to receive your 10-digit PNR, QR Code, PDF ticket, and email confirmation!`
    },

    // Cancellation & Refunds
    {
        keywords: ["cancel", "cancellation", "refund", "how to cancel"],
        response: `❌ **Ticket Cancellation & Seat Restoration**:
• **How to Cancel**: Go to **My Bookings**, find your confirmed ticket, and click **Cancel Ticket**.
• **Instant Seat Restoration**: All seats assigned to the booking are immediately restored back to the train's available inventory for other passengers.
• **Refund**: Refund amount is computed based on cancellation timing and credited back to your original payment method.`
    },

    // Live Train Running Status
    {
        keywords: ["live status", "track train", "train running", "running status", "delay", "is train late"],
        response: `📍 **Live Train Running Status**:
• Click **Live Status** on the top navigation bar.
• Enter your **5-digit Train Number** (e.g. 12951, 12002, 22436).
• You will see live station-by-station arrival times, platform numbers, and estimated delays.`
    },

    // Luggage & Baggage Allowance
    {
        keywords: ["luggage", "baggage", "weight", "how much luggage", "carry bag"],
        response: `🧳 **Indian Railways Free Baggage Allowance**:
• **First AC (1A)**: Up to **70 kg** free luggage.
• **Second AC (2A)**: Up to **50 kg** free luggage.
• **Third AC (3A) & AC Chair Car (CC)**: Up to **40 kg** free luggage.
• **Sleeper Class (SL)**: Up to **40 kg** free luggage.
• Trunks, suitcases, and bags within 100 cm x 60 cm x 25 cm are permitted in all compartments.`
    },

    // Meals & Pantry
    {
        keywords: ["food", "meal", "pantry", "breakfast", "dinner", "catering", "irctc food"],
        response: `🍱 **Onboard Meals & Food Services**:
• **Premium Trains (Rajdhani, Shatabdi, Vande Bharat)**: Complimentary or optional hot breakfast, lunch, high tea, and dinner served at your seat.
• **Mail/Express Trains**: Onboard pantry cars offer fresh meals, chai, coffee, and snacks.
• **E-Catering**: Passengers can also order food from popular restaurant brands delivered directly to their coach at major en-route stations!`
    },

    // Children & Infant Rules
    {
        keywords: ["child", "children", "baby", "infant", "kid", "age limit"],
        response: `👶 **Child Fare & Travel Rules**:
• **Under 5 Years**: Travels **free of charge** without an assigned berth.
• **Children Aged 5 to 11 Years**:
  - Can pay **full adult fare** if you want an assigned separate berth.
  - Can pay **half fare** if sharing a berth with parents.
• Age proof may be requested by the Travelling Ticket Examiner (TTE).`
    },

    // Station Codes
    {
        keywords: ["station code", "code", "ndls", "bct", "bpl", "ujn", "hwh", "bsb", "mas", "sbc"],
        response: `🚉 **Major Indian Railway Station Codes**:
• **NDLS**: New Delhi | **DLI**: Old Delhi | **NZM**: Hazrat Nizamuddin
• **BCT / MMCT**: Mumbai Central | **CSMT**: Chhatrapati Shivaji Maharaj Terminus
• **BPL**: Bhopal Junction | **RKMP**: Rani Kamlapati (Habibganj)
• **UJN**: Ujjain Junction (Mahakaleshwar Corridor)
• **HWH**: Howrah (Kolkata) | **SDAH**: Sealdah
• **BSB**: Varanasi Junction | **MAS**: Chennai Central
• **SBC**: KSR Bengaluru | **PNBE**: Patna Junction
• **JP**: Jaipur Junction | **AGC**: Agra Cantt`
    },

    // Account & Password
    {
        keywords: ["forgot password", "reset password", "otp", "login issue", "signup issue"],
        response: `🔐 **Account & Security Support**:
• **Forgot Password**: Click "Forgot Password" on the login page, enter your registered email, and verify with the 6-digit OTP sent to your inbox.
• **Instant OTP Delivery**: RailNova uses dual Brevo API and Nodemailer to ensure OTPs arrive in under 5 seconds!
• **Password Security**: All user credentials are encrypted with 10 salt rounds of bcrypt.`
    },

    // About RailNova & Creator
    {
        keywords: ["who made you", "creator", "developer", "who are you", "what is railnova", "manit"],
        response: `🚆 **About RailNova**:
• **RailNova** is a modern, full-stack railway reservation and management system covering 1,500+ Indian train routes.
• Features an AI assistant, group bookings (up to 6 passengers), Tatkal emergency quotas, per-passenger concessions, dynamic seat allocation, and digital QR/PDF tickets.
• **Designed & Developed by**: **Sanyam Jain**, Computer Science & Engineering student at **MANIT Bhopal** (Maulana Azad National Institute of Technology).`
    },

    // Greetings
    {
        keywords: ["hi", "hello", "hey", "good morning", "good evening", "namaste"],
        response: `👋 Namaste! I am **RailNova AI Assistant**.
I can assist you with:
• Finding trains between any Indian stations
• Checking live **10-digit PNR status**
• ⚡ Tatkal & Premium Tatkal quotas
• 👥 Multi-passenger group bookings
• 🎟️ Concessions (Senior Citizen & PWD)
• 💺 Coach classes (1A, 2A, 3A, CC, SL) & cancellations

What would you like to know today?`
    },

    // Thank you
    {
        keywords: ["thank you", "thanks", "dhanyawad", "great", "awesome"],
        response: `🙏 You're welcome! Wishing you a very safe, comfortable, and pleasant journey with **RailNova**! Feel free to ask whenever you need assistance. 🚆✨`
    }
];

/**
 * Handle AI Chat Requests with Live DB Search & Fallbacks
 */
const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ reply: "Please enter a valid message." });
        }

        const query = message.trim();
        const lowerQuery = query.toLowerCase();

        // ----------------------------------------------------
        // 1. REAL-TIME DATABASE LOOKUP: 10-Digit PNR Number
        // ----------------------------------------------------
        const pnrMatch = query.match(/\b\d{10}\b/);
        if (pnrMatch) {
            const pnrNumber = pnrMatch[0];
            try {
                const booking = await Booking.findOne({ pnr: pnrNumber });
                if (booking) {
                    const passList = (booking.passengers && booking.passengers.length > 0)
                        ? booking.passengers.map((p, idx) => `  ${idx + 1}. ${p.name} (${p.gender}, ${p.age}) → Coach ${p.coachNumber || booking.coachNumber}, Seat ${p.seatNumber} [${p.berth}]`).join("\n")
                        : `  1. ${booking.passengerName} (${booking.gender}, ${booking.age}) → Coach ${booking.coachNumber}, Seat ${booking.seatNumber} [${booking.berth}]`;

                    const statusEmoji = booking.status === "Confirmed" ? "✅" : "❌";

                    return res.json({
                        reply: `🎫 **PNR Status Found (${booking.pnr})**:
• **Train**: ${booking.trainName} (${booking.trainNumber})
• **Route**: ${booking.from} ➔ ${booking.to}
• **Journey Date**: ${booking.journeyDate || "Scheduled"}
• **Quota**: ${booking.quota || "General"}
• **Status**: ${statusEmoji} **${booking.status.toUpperCase()}**
• **Passengers**:
${passList}
• **Fare Paid**: ₹${booking.fare}`
                    });
                } else {
                    return res.json({
                        reply: `🔍 **PNR ${pnrNumber}**: No booking was found in the system for this PNR number. Please verify the 10 digits and try again, or check from your **My Bookings** dashboard.`
                    });
                }
            } catch (pnrErr) {
                console.error("PNR lookup error:", pnrErr.message);
            }
        }

        // ----------------------------------------------------
        // 2. REAL-TIME DATABASE LOOKUP: Train Route Inquiry (from X to Y)
        // ----------------------------------------------------
        const routeMatch = lowerQuery.match(/(?:from\s+)?([a-zA-Z\s]+?)\s+(?:to|towards|->|➔|-)\s+([a-zA-Z\s]+)/);
        if (routeMatch && routeMatch[1] && routeMatch[2]) {
            const fromCity = routeMatch[1].replace(/trains?|any|is\s+there/gi, "").trim();
            const toCity = routeMatch[2].replace(/trains?|please|today|tomorrow/gi, "").trim();

            if (fromCity.length >= 3 && toCity.length >= 3) {
                try {
                    const matchingTrains = await Train.find({
                        from: new RegExp(fromCity, "i"),
                        to: new RegExp(toCity, "i")
                    }).limit(4);

                    if (matchingTrains && matchingTrains.length > 0) {
                        let trainList = matchingTrains.map((t, idx) => 
                            `• **${t.trainName}** (${t.trainNumber})\n  Departure: ${t.departure} | Arrival: ${t.arrival} | Duration: ${t.duration} | Fare: ₹${t.fare} | Available Seats: ${t.availableSeats}`
                        ).join("\n\n");

                        return res.json({
                            reply: `🚆 **Trains Found: ${fromCity.toUpperCase()} ➔ ${toCity.toUpperCase()}** (${matchingTrains.length} shown):\n\n${trainList}\n\n👉 You can book any of these trains directly on the **Train Search** page!`
                        });
                    }
                } catch (trainErr) {
                    console.error("Train route lookup error:", trainErr.message);
                }
            }
        }

        // ----------------------------------------------------
        // 3. REAL-TIME DATABASE LOOKUP: Specific Train Name or City Search
        // ----------------------------------------------------
        const popularTrainTerms = ["mahakal", "rajdhani", "shatabdi", "vande bharat", "avantika", "malwa", "intercity", "ujjain", "bhopal", "delhi", "mumbai"];
        const matchedTerm = popularTrainTerms.find(term => lowerQuery.includes(term));

        if (matchedTerm && (lowerQuery.includes("train") || lowerQuery.includes("timing") || lowerQuery.includes("schedule") || lowerQuery.includes("express"))) {
            try {
                const results = await Train.find({
                    $or: [
                        { trainName: new RegExp(matchedTerm, "i") },
                        { from: new RegExp(matchedTerm, "i") },
                        { to: new RegExp(matchedTerm, "i") }
                    ]
                }).limit(3);

                if (results && results.length > 0) {
                    let list = results.map(t => 
                        `• **${t.trainName}** (${t.trainNumber}): ${t.from} ➔ ${t.to} (${t.departure} to ${t.arrival}) | Fare: ₹${t.fare}`
                    ).join("\n");

                    return res.json({
                        reply: `🚆 **Available Trains related to "${matchedTerm.toUpperCase()}"**:\n\n${list}\n\nHead to **Train Search** to reserve your seats!`
                    });
                }
            } catch (e) {
                console.error("Term search error:", e.message);
            }
        }

        // ----------------------------------------------------
        // 4. KNOWLEDGE BASE MATCHING
        // ----------------------------------------------------
        for (const item of KNOWLEDGE_BASE) {
            const hasMatch = item.keywords.some(keyword => lowerQuery.includes(keyword));
            if (hasMatch) {
                return res.json({ reply: item.response });
            }
        }

        // ----------------------------------------------------
        // 5. GOOGLE GEMINI API FALLBACK (If Key is Configured)
        // ----------------------------------------------------
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey && apiKey.trim()) {
            try {
                const systemPrompt = `You are RailNova AI, the smart conversational railway assistant for RailNova (a full-stack Indian Railway reservation system built by Sanyam Jain from MANIT Bhopal).
Answer the user's travel or railway question accurately, politely, concisely, and with emojis. Cover Indian Railways rules, stations, routes, coaches, and booking tips.`;

                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
                    {
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }]
                            }
                        ]
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        timeout: 8000
                    }
                );

                const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (aiReply) {
                    return res.json({ reply: aiReply });
                }
            } catch (apiError) {
                console.log("ℹ️ Gemini API call fallback to default guide:", apiError.message);
            }
        }

        // ----------------------------------------------------
        // 6. DEFAULT COMPREHENSIVE RAILWAY GUIDE
        // ----------------------------------------------------
        return res.json({
            reply: `🚆 **RailNova AI Assistant**:
I can help you with anything related to your railway journey! Try asking me:
• *"Trains from Delhi to Mumbai"* or *"Trains to Ujjain"*
• Paste any **10-digit PNR number** to see live passenger status
• *"How does Tatkal booking work?"* (Surge quotas & 10 AM/11 AM timings)
• *"How many passengers can I book together?"* (Up to 6 passengers)
• *"What concessions are available?"* (Senior Citizen 40% & PWD 50%)
• *"Explain 1A, 2A, 3A, and Sleeper coach classes"*
• *"How to cancel a ticket and get refund?"*
• *"What is the baggage weight allowance?"*`
        });

    } catch (error) {
        console.error("❌ AI Chat Error:", error.message);
        return res.status(500).json({
            reply: "🚆 RailNova Assistant is momentarily busy. Please try asking your question again!"
        });
    }
};

module.exports = { handleChat };
