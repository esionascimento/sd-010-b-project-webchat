const socket = window.io();

const inputNickmame = document.querySelector('.nickname');
const sendNickname = document.querySelector('.send_nickname');
const inputMsg = document.querySelector('.messages__item');
const sendMsg = document.querySelector('.send_message');

function createMsg(element, msg, elementTest) {
  const ul = document.querySelector(element);
  const li = document.createElement('li');
  
  li.setAttribute('data-testid', elementTest);
  li.innerText = msg;
  ul.appendChild(li);
}

const newUser = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

window.onload = () => {
  createMsg('.nicknames', newUser, 'online-user');
  sessionStorage.setItem('user', newUser);
};

window.onbeforeunload = () => {
  socket.disconnect();
};

sendNickname.addEventListener('click', (e) => {
  e.preventDefault();

  const nickname = inputNickmame.value;
  sessionStorage.setItem('user', nickname);

  createMsg('.nicknames', nickname, 'online-user');

  inputNickmame.value = '';

  return false;
});

sendMsg.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nickname = sessionStorage.getItem('user');
  socket.emit('message', { nickname, chatMessage: inputMsg.value });

  inputMsg.value = '';

  return false;
});

socket.on('message', (msg) => createMsg('.messages', msg, 'message'));
