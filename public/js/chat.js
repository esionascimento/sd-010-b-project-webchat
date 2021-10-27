const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#message-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: socket.id });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  console.log(message);
  const { nickname, chatMessage, time } = message;
  li.innerText = `${nickname}: ${chatMessage} - ${time}`;
  messagesUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));