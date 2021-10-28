const socket = window.io();

const messageForm = document.getElementById('message-form');
const inputMessage = document.querySelector('#message-input');
const nicknameForm = document.getElementById('nickname-form');
const nicknameInput = document.getElementById('nickname-input');

const generateNickName = () => {
  const nickNameLenght = 16;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
     'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];
  let newNickName = '';
  for (let i = 1; i <= nickNameLenght; i += 1) {
    const randomNumber = Math.floor((Math.random() * letters.length));
    const randomLetter = letters[randomNumber];
    newNickName += randomLetter;
  }
  return newNickName;
};

function setNickname() {
  const nickNameP = document.getElementById('nickname');
  const newNickName = generateNickName();
  sessionStorage.setItem('nickname', newNickName);
  nickNameP.innerText = newNickName;
}

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickNameP = document.getElementById('nickname');
  sessionStorage.setItem('nickname', nicknameInput.value);
  nickNameP.innerText = nicknameInput.value;
  nicknameInput.value = '';
  return false;
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('connect', () => {
  setNickname();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('nickname', { nickname });
});

socket.on('message', (message) => createMessage(message));
socket.on('messagesList', (messagesList) => {
  messagesList.forEach((message) => createMessage(message));
});