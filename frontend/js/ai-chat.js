(function () {
    // Determine Backend URL dynamically
    const BACKEND_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:8080"
        : "https://railnova.onrender.com";

    // Inject AI Widget HTML
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "railnova-ai-widget";
    widgetContainer.innerHTML = `
        <button id="ai-toggle-btn">🤖 RailNova AI</button>
        <div id="ai-chat-box">
            <div class="ai-header">
                <h4>🤖 RailNova Assistant</h4>
                <button class="ai-close-btn" id="ai-close-btn">&times;</button>
            </div>
            <div class="ai-messages" id="ai-messages">
                <div class="ai-msg ai-msg-bot">
                    👋 Hi! I am your <b>RailNova Assistant</b>. Ask me anything about trains, PNR status, coach classes, or ticket booking!
                </div>
            </div>
            <div class="ai-input-container">
                <input type="text" id="ai-user-input" placeholder="Ask a question..." />
                <button id="ai-send-btn">Send</button>
            </div>
        </div>
    `;

    document.body.appendChild(widgetContainer);

    // DOM Elements
    const toggleBtn = document.getElementById("ai-toggle-btn");
    const chatBox = document.getElementById("ai-chat-box");
    const closeBtn = document.getElementById("ai-close-btn");
    const sendBtn = document.getElementById("ai-send-btn");
    const userInput = document.getElementById("ai-user-input");
    const messagesContainer = document.getElementById("ai-messages");

    // Toggle Chat
    toggleBtn.addEventListener("click", () => {
        chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
        if (chatBox.style.display === "flex") {
            userInput.focus();
        }
    });

    closeBtn.addEventListener("click", () => {
        chatBox.style.display = "none";
    });

    // Send Message Handler
    const sendMessage = async () => {
        const text = userInput.value.trim();
        if (!text) return;

        // Render User Message
        const userMsgDiv = document.createElement("div");
        userMsgDiv.className = "ai-msg ai-msg-user";
        userMsgDiv.textContent = text;
        messagesContainer.appendChild(userMsgDiv);

        userInput.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Render Loading Indicator
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "ai-msg ai-msg-bot";
        loadingDiv.textContent = "⏳ Thinking...";
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const res = await fetch(`${BACKEND_URL}/api/ai/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });

            const data = await res.json();
            loadingDiv.remove();

            const botMsgDiv = document.createElement("div");
            botMsgDiv.className = "ai-msg ai-msg-bot";
            botMsgDiv.innerHTML = (data.reply || "Unable to get response").replace(/\n/g, "<br>");
            messagesContainer.appendChild(botMsgDiv);
        } catch (err) {
            loadingDiv.remove();
            const errDiv = document.createElement("div");
            errDiv.className = "ai-msg ai-msg-bot";
            errDiv.textContent = "🚆 RailNova Assistant is currently offline. Please try again later!";
            messagesContainer.appendChild(errDiv);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
})();
