const socket = window.io();

let nickname = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

const logo = document.querySelector('.logo');
const allMessages = document.querySelector('.all-messages');
const userArea = document.querySelector('.logged-user');
const newNicknameInput = document.querySelector('.nickname-input');
const newNicknameButton = document.querySelector('.nickname-button');
const newMessageInput = document.querySelector('.new-message-input');
const newMessageButton = document.querySelector('.send-message-button');

// creates the nickname div
const showNickname = () => {
  const online = document.createElement('div');
  online.setAttribute('class', 'neonText');
  const userNickname = document.createElement('h1');
  userNickname.setAttribute('class', 'user-nickname');
  userNickname.setAttribute('data-testid', 'online-user');
  userNickname.innerText = nickname;
  userArea.prepend(userNickname);
  userArea.prepend(online);
  return false;
};

// send the message and nickname to the server
newMessageButton.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = newMessageInput.value;
  socket.emit('message', {
    chatMessage,
    nickname,
  });
  newMessageInput.value = '';
  return false;
});

// EasterEgg
logo.addEventListener('click', (_e) => {
  socket.emit('message', {
    chatMessage: 'Você achou o EasterEgg!!!',
    nickname: 'RocketChat',
  });
  return false;
});

// receives the message from the server and prints on the board
socket.on('message', (string) => {
  const messageDiv = document.createElement('div');
  messageDiv.innerText = string;
  messageDiv.setAttribute('data-testid', 'message');
  messageDiv.setAttribute('class', 'message');
  // to use after finish the project
  // allMessages.prepend(messageDiv);
  // used to pass the req2
  allMessages.append(messageDiv);
});

// send the new nickname to the server
newNicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  nickname = newNicknameInput.value;
  newNicknameInput.value = '';
  return false;
});

window.onload(
  showNickname(),
  // showNickname(),
  // showNickname(),
  // showNickname(),
);