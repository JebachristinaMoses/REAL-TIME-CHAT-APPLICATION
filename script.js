// WebSocket connection (public echo server)
const socket = new WebSocket('wss://echo.websocket.org');

// DOM elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messages');

// Display message in the chat window
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

// Handle sending messages
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.send(message); // Send message via WebSocket
        displayMessage(`You: ${message}`); // Show user's message in the chat window
        messageInput.value = ''; // Clear the input field
    }
});

// Receive messages from the server (WebSocket)
socket.addEventListener('message', (event) => {
    displayMessage(`Server: ${event.data}`); // Display the server's response (echoed message)
});

// Handle WebSocket open connection
socket.addEventListener('open', () => {
    displayMessage("Connected to the server!");
});

// Handle WebSocket errors
socket.addEventListener('error', (error) => {
    displayMessage(`Error: ${error}`);
});

// Handle WebSocket close connection
socket.addEventListener('close', () => {
    displayMessage("Connection closed.");
});
