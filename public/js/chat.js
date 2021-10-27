const socket = window.io();

const formMessage = document.querySelector('#formsMessage');
const formNickName = document.querySelector('#formsNickName');
const inputMessage = document.querySelector('#messageInput');
const inputNickName = document.querySelector('#nickInput');
inputNickName.innerText = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: inputNickName.innerText });
  inputMessage.value = '';
  return false;
});

formNickName.addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = document.querySelector('#nickName');
  nick.innerText = inputNickName.value;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));