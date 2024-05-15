// main.js
document.addEventListener('DOMContentLoaded', (event) => {
    const apiUrl = '/api/chat';

    // Generate random username if not already set in cookies
    if (!getCookie('username')) {
        setCookie('username', generateRandomUsername(), 365);
    }
    const username = getCookie('username');
    
    const chatLog = document.getElementById('chat-log');
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const addButton = document.getElementById('add-button');

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Poll for new messages every 2 seconds
    setInterval(fetchMessages, 2000);

    let currentRoom = 'general'; // Default room

    async function fetchMessages() {
        const response = await fetch(`${apiUrl}?room=${currentRoom}`);
        const messages = await response.json();
        chatLog.innerHTML = '';
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${msg.username}: ${msg.message}`;
            chatLog.appendChild(messageElement);
        });
        chatLog.scrollTop = chatLog.scrollHeight;  // Auto-scroll to the bottom
    }

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const payload = { username, message, room: currentRoom };
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Display the message in the chat log immediately
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

    // Function to show the pop-up
    function showPopup() {
        document.getElementById('popup').classList.remove('hidden');
    }

    addButton.addEventListener('click', showPopup);

    // Function to hide the pop-up
    function hidePopup() {
        document.getElementById('popup').classList.add('hidden');
    }

    // Function to create a room
    function createRoom() {
        const roomName = prompt('Enter room name:');
        if (roomName) {
            addTab(roomName);
            switchRoom(roomName);
            hidePopup();
            // Placeholder for future game method
            // createGameRoom(roomName);
        }
    }

    // Function to connect a user
    function connectUser() {
        const username = prompt('Enter username to connect:');
        if (username) {
            const roomName = `Private chat with ${username}`;
            addTab(roomName);
            switchRoom(roomName);
            hidePopup();
        }
    }

    // Function to add a tab for the new room
    function addTab(roomName) {
        const tabs = document.getElementById('tabs');
        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.textContent = roomName;
        tab.onclick = () => switchRoom(roomName);
        tabs.appendChild(tab);

        // Placeholder for future room logic
        // createRoomInBackend(roomName);
    }

    // Function to switch rooms
    function switchRoom(roomName) {
        currentRoom = roomName;
        document.getElementById('chat-log').innerHTML = ''; // Clear current chat log
        document.getElementById('message-input').placeholder = `Type a message for ${roomName}...`;
        fetchMessages(); // Fetch messages for the new room
    }

    // Call switchRoom to load the default room messages initially
    switchRoom(currentRoom);
});