
// Generate a random username for the user
function generateUsername() {
  return 'user' + Math.floor(Math.random() * 1000000);
}

// Get the username from the cookie or generate a new one
function getUsername() {
  const username = getCookie('username');
  if (username) {
    return username;
  } else {
    const newUsername = generateUsername();
    setCookie('username', newUsername, 30);
    return newUsername;
  }
}

// Set a cookie with the given name, value, and expiration days
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Get the value of a cookie with the given name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
}

// Send a message to the server
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  if (message.trim()) {
    const username = getUsername();
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${message}`;
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.appendChild(messageElement);
    messageInput.value = '';

    // Send the message to the server using WebSocket
    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ username, message }));
    });
  }
}

// Add an event listener to the message input field to send the message when the user presses Enter
document.getElementById('messageInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Add an event listener to the send button to send the message when the user clicks it
document.getElementById('sendButton').addEventListener('click', sendMessage);
