document.addEventListener('DOMContentLoaded', () => {
  // Generate a random username for the user
  function generateUsername() {
    const animals = ['cat', 'dog', 'elephant', 'lion', 'tiger'];
    const tools = ['hammer', 'screwdriver', 'wrench', 'pliers', 'saw'];
    const vehicles = ['car', 'bike', 'bus', 'train', 'plane'];
    const numbers = ['123', '456', '789', '000', '999', '001', '002', '003', '004', '005'];

    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomTool = tools[Math.floor(Math.random() * tools.length)];
    const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    return `${randomAnimal}${randomTool}${randomVehicle}${randomNumber}`;
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
});
