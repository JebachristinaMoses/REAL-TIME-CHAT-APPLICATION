const socket = new WebSocket('wss://echo.websocket.org');

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messages');

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.send(message); // Send message via WebSocket
        displayMessage(`You: ${message}`); // Show user's message in the chat window
        messageInput.value = ''; // Clear the input field
    }
});

socket.addEventListener('message', (event) => {
    displayMessage(`Server: ${event.data}`); // Display the server's response (echoed message)
});

socket.addEventListener('open', () => {
    displayMessage("Connected to the server!");
});

socket.addEventListener('error', (error) => {
    displayMessage(`Error: ${error}`);
});

socket.addEventListener('close', () => {
    displayMessage("Connection closed.");
});
