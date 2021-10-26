const socket = window.io();

const form = document.getElementById('form');
const chatMessage = document.getElementById('messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', 
    { chatMessage: chatMessage.value });
  chatMessage.value = '';
  return false;
});

const createMessage = (text) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  const today = new Date().toLocaleString().replaceAll('/', '-');
  li.innerText = `${today} nickname: ${text}`;
  messagesUl.appendChild(li);
};

// socket.on('ola', (message) => createMessage(message));
// quando o cliente clica em ping, o evento 'pong' é disparado e a messagem aparece na tela
socket.on('message', (text) => createMessage(text));