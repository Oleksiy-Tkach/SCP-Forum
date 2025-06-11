function sendMessage() {
  const messageInput = document.getElementById('chatMessage');
  const messageText = messageInput.value.trim();

  if (messageText !== "") {
    const messagesDiv = document.getElementById('messages');

    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = messageText;

    messagesDiv.appendChild(message);
    messageInput.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    saveMessages();
  }
}

function deleteLastMessage() {
  const messagesDiv = document.getElementById('messages');
  const lastMessage = messagesDiv.lastElementChild;
  if (lastMessage) {
    messagesDiv.removeChild(lastMessage);
    saveMessages();
  }
}

function saveMessages() {
  const messages = Array.from(document.querySelectorAll('.message')).map(msg => msg.textContent);
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
  const messagesDiv = document.getElementById('messages');

  messages.forEach(text => {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    messagesDiv.appendChild(message);
  });
}

window.addEventListener('DOMContentLoaded', loadMessages);
