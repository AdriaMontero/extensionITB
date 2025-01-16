let socket;

document.addEventListener('DOMContentLoaded', (event) => {
  initializeWebSocket();

  document.getElementById('send-chat').addEventListener('click', function() {
    const message = document.getElementById('chat-input').value;
    if (message) {
      sendMessage(message);
      document.getElementById('chat-input').value = '';
    }
  });
});

function initializeWebSocket() {
  socket = new WebSocket('ws://localhost:8765');
  
  socket.onopen = function(event) {
    console.log('WebSocket is open now.');
  };

  socket.onmessage = function(event) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = event.data;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  socket.onclose = function(event) {
    console.log('WebSocket is closed now.');
  };

  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };
}

function sendMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  }
}
