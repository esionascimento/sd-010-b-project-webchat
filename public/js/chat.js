const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#message-input');

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

window.onload = function setNickname() {
  const nickNameP = document.getElementById('nickname');
  const newNickName = generateNickName();
  sessionStorage.setItem('nickname', newNickName);
  nickNameP.innerText = newNickName;
};

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
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));