// main.js
document.addEventListener('DOMContentLoaded', (event) => {
  // Generate random username if not already set in cookies
  if (!getCookie('username')) {
      setCookie('username', generateRandomUsername(), 365);
  }
  
  const sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', sendMessage);

  const messageInput = document.getElementById('message-input');
  messageInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });
});

function sendMessage() {
  const chatLog = document.getElementById('chat-log');
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  
  if (message) {
      const username = getCookie('username');
      const messageElement = document.createElement('div');
      messageElement.textContent = `${username}: ${message}`;
      chatLog.appendChild(messageElement);
      messageInput.value = '';
      chatLog.scrollTop = chatLog.scrollHeight;  // Auto-scroll to the bottom
  }
}

function generateRandomUsername() {
  const names = ['Penguin', 'Wrench', 'Cat', 'Dog', 'Eagle', 'Lion'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomName}${randomNumber}`;
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
          return c.substring(cname.length, c.length);
      }
  }
  return "";
}