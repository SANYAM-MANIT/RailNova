const axios = require("axios");

/**
 * Smart Railway Assistant Knowledge Base (Fallback Engine)
 */
const getFallbackResponse = (message) => {
    const query = message.toLowerCase();

    if (query.includes("pnr") || query.includes("status")) {
        return "🎫 **PNR Status**: You can check your 10-digit PNR status by navigating to the **PNR Status** tab on the top menu and entering your PNR number.";
    }

    if (query.includes("book") || query.includes("ticket") || query.includes("how to")) {
        return "🚆 **How to Book a Ticket**:\n1. Search for trains between your origin & destination.\n2. Click 'Book Now' on your desired train.\n3. Enter passenger details & berth preferences.\n4. Complete the payment to receive your confirmed ticket & PNR via email!";
    }

    if (query.includes("cancel") || query.includes("refund")) {
        return "❌ **Ticket Cancellation**:\nYou can cancel any confirmed ticket from the **My Bookings** section. Upon cancellation, the seat availability is automatically restored!";
    }

    if (query.includes("coach") || query.includes("3a") || query.includes("2a") || query.includes("sleeper") || query.includes("berth")) {
        return "💺 **Coach Classes Guide**:\n- **1A (First AC)**: H1 coach, coupés & cabins with maximum comfort.\n- **2A (Second AC)**: A1/A2 coaches with 4 berths per compartment.\n- **3A (Third AC)**: B1/B2 coaches with 6 berths per compartment.\n- **SL (Sleeper)**: S1/S2 non-AC sleeper coaches.";
    }

    if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
        return "👋 Hello! I am **RailNova AI Assistant**. How can I assist you with your railway journey today?";
    }

    return "🚆 **RailNova Assistant**: I am here to help you with train searches, ticket bookings, PNR status, coach classes (1A/2A/3A/SL), and ticket cancellations! What would you like to know?";
};

/**
 * Handle AI Chat Requests
 */
const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ reply: "Please enter a valid message." });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        // If Gemini API Key is available, call Google Gemini REST API
        if (apiKey && apiKey.trim()) {
            try {
                const systemPrompt = "You are RailNova AI, a helpful, polite railway assistant for the RailNova train booking platform. Keep answers concise, helpful, and formatted with emojis.";
                
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
                    {
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
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
                console.log("ℹ️ Gemini API call fallback activated:", apiError.message);
            }
        }

        // Return smart fallback response if Gemini key is missing or call failed
        const fallbackReply = getFallbackResponse(message);
        return res.json({ reply: fallbackReply });

    } catch (error) {
        console.error("❌ AI Chat Error:", error.message);
        return res.status(500).json({
            reply: "🚆 RailNova Assistant is momentarily busy. Please ask your question again!"
        });
    }
};

module.exports = { handleChat };
