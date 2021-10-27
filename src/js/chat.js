const socket = window.io();

const inputNickmame = document.querySelector('#nickname');
const sendNickname = document.querySelector('#send_nickname');
const inputMsg = document.querySelector('#messages__item');
const sendMsg = document.querySelector('#send_message');

function createMsg(msg) {
  const msgUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = msg;

  msgUl.appendChild(li);
}

const newUser = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

window.onload = () => {
  createMsg(newUser);
};

sendNickname.addEventListener('click', (e) => {
  e.preventDefault();

  createMsg(inputNickmame.value);
  
  inputNickmame.value = '';

  return false;
});

sendMsg.addEventListener('click', (e) => {
  e.preventDefault();
  
  socket.emit('message', { nickname: newUser, chatMessage: inputMsg.value });

  inputMsg.value = '';

  return false;
});

socket.on('message', (msg) => createMsg(msg));
