document.addEventListener('DOMContentLoaded', function () {
    const socket = new WebSocket('ws://your-socket-server-url');
    const chatWindow = document.getElementById('chatWindow');
    const messageInput = document.getElementById('messageInput');

    socket.addEventListener('message', function (event) {
        const message = JSON.parse(event.data);
        displayMessage(message);
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const message = { type: 'chat', text: messageText };
            socket.send(JSON.stringify(message));
            messageInput.value = ''; // Clear the input after sending
        }
    }

    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message.text;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Event listener for the "Send" button
    document.getElementById('sendButton').addEventListener('click', sendMessage);
});
