const socket = window.io();

socket.on('userConnect', (id) => {
  const usersList = document.querySelector('#usersList');
  const userId = document.createElement('li');
  userId.innerText = `User ID: ${id}`;
  usersList.appendChild(userId);
});

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));