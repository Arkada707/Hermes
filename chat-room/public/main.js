// main.js
document.addEventListener("DOMContentLoaded", (event) => {
  const apiUrl = "/api/chat";

  // Generate random username if not already set in cookies
  if (!getCookie("username")) {
    setCookie("username", generateRandomUsername(), 365);
  }
  const username = getCookie("username");

  const chatLog = document.getElementById("chat-log");
  const sendButton = document.getElementById("send-button");
  const messageInput = document.getElementById("message-input");
  //const createButton = document.getElementById('create-button');

  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Poll for new messages every 0.5 seconds
  setInterval(fetchMessages, 500);

  let previousMessageCount = 0;

  async function fetchMessages() {
    const response = await fetch(apiUrl);
    const messages = await response.json();

    const currentMessageCount = messages.length;

    if (currentMessageCount > previousMessageCount) {
      chatLog.innerHTML = "";
      messages.forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${msg.username}: ${msg.message}`;
        chatLog.appendChild(messageElement);
      });
      chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom

      // Play notification sound
      playNotificationSound();
    }

    previousMessageCount = currentMessageCount;
  }

  function playNotificationSound() {
    const audio = document.getElementById("notificationSound");
    audio.play();
  }

  async function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      const payload = { username, message };
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      messageInput.value = "";
    }
    db.ref("chats/").once("value", function (message_object) {
      var index = parseFloat(message_object.numChildren()) + 1;
      db.ref("chats/" + "message_${index}").set({
        name: username,
        message: message,
        index: index,
      });
    });
  }

  function generateRandomUsername() {
    const names = ["Penguin", "Wrench", "Cat", "Dog", "Eagle", "Lion"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomName}${randomNumber}`;
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }

  var db = firebase.database();
});
