const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createUsuario = (message) => {
  const messagesUl = document.querySelector('#usuario');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createNewUsuario = (message) => {
  const messagesUl = document.querySelector('#usuarios');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('login', (mensagem) => createUsuario(mensagem));
socket.on('newlogin', ({ usuario }) => createNewUsuario(usuario));
socket.on('message', (message) => createMessage(message));