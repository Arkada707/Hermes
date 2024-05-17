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
  const createButton = document.getElementById("create-button");

  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Poll for new messages every 1 second
  setInterval(fetchMessages, 1000);

  async function fetchMessages() {
    const response = await fetch(apiUrl);
    const messages = await response.json();
    chatLog.innerHTML = "";
    messages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${msg.username}: ${msg.message}`;
      chatLog.appendChild(messageElement);
    });
    //chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom
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
  }

  function generateRandomUsername() {
    const names = [
      "Penguin",
      "Wrench",
      "Cat",
      "Dog",
      "Eagle",
      "Lion",
      "Dragon",
      "Elf",
      "Wizard",
      "Knight",
      "Ninja",
      "Samurai",
      "Viking",
      "Pirate",
      "Zombie",
      "Robot",
      "Alien",
      "Monster",
      "Ghost",
      "Witch",
      "Vampire",
      "Werewolf",
      "Mermaid",
      "Unicorn",
      "Phoenix",
      "Griffin",
      "Hydra",
      "Cerberus",
      "Basilisk",
      "Chimera",
      "Manticore",
      "Minotaur",
      "Cyclops",
      "Goblin",
      "Orc",
      "Troll",
      "Giant",
      "Fairy",
      "Sprite",
      "Gnome",
      "Imp",
      "Leprechaun",
      "Dwarf",
      "Halfling",
      "Ogre",
      "Siren",
      "Harpy",
      "Centaur",
      "Satyr",
      "Dryad",
      "Nymph",
      "Sphinx",
      "Pegasus",
      "Hippogriff",
      "Thunderbird",
      "Yeti",
      "Bigfoot",
      "Loch Ness",
      "Kraken",
      "Leviathan",
      "Behemoth",
      "Hydra",
      "Cerberus",
      "Basilisk",
      "Chimera",
      "Manticore",
      "Minotaur",
      "Cyclops",
      "Goblin",
      "Orc",
      "Troll",
      "Giant",
      "Fairy",
      "Sprite",
      "Gnome",
      "Imp",
      "Leprechaun",
      "Dwarf",
      "Halfling",
      "Ogre",
      "Siren",
      "Harpy",
      "Centaur",
      "Satyr",
      "Dryad",
      "Nymph",
      "Sphinx",
      "Pegasus",
      "Hippogriff",
      "Thunderbird",
      "Yeti",
      "Bigfoot",
      "Loch Ness",
      "Kraken",
      "Leviathan",
      "Behemoth",
    ];
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

  createButton.addEventListener("click", writeUp);

  async function writeUp() {
    const meanRemarks = [
      "I bet your girlfriend left you. LOL!",
      "I can't stand you!",
      "You are so annoying!",
      "Go away!",
      "You are GAY!",
      "Nice C#ck!",
      "Ur PP smol",
      "Why are you gay?",
      "Lonely, you are so lonely, you have nobody, you're on your own HA!",
    ];
    const randomRemark =
      meanRemarks[Math.floor(Math.random() * meanRemarks.length)];
    const messageElement = document.createElement("div");
    messageElement.textContent = `AI-Button: ${randomRemark}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom
  }
});
