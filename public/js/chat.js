const socket = window.io();

const DATA_TEST_ID = 'data-testid';

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
  const newNickName = generateNickName();
  sessionStorage.setItem('nickname', newNickName);
}

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', nicknameInput.value);
  socket.emit('nickname', { nickname: nicknameInput.value });
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
  li.setAttribute(DATA_TEST_ID, 'message');
  messagesUl.appendChild(li);
};

const renderOnlineUsers = (onlineUsers) => {
  const onlineUsersUl = document.getElementById('online-users-list');
  const thisUserNickName = sessionStorage.getItem('nickname');
  const thisUserNickNameLi = document.createElement('li');
  thisUserNickNameLi.setAttribute(DATA_TEST_ID, 'online-user');
  thisUserNickNameLi.innerText = thisUserNickName;
  onlineUsersUl.appendChild(thisUserNickNameLi);
  const onlineUsersNickNames = onlineUsers.map((userObj) => userObj.nickname);
  onlineUsersNickNames.forEach((user) => {
    const userLi = document.createElement('li');
    userLi.setAttribute(DATA_TEST_ID, 'online-user');
    userLi.innerText = user;
    onlineUsersUl.appendChild(userLi);
  });
};

socket.on('onlineUsers', (onlineUsers) => renderOnlineUsers(onlineUsers));

socket.on('connect', () => {
  setNickname();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('newUserNickname', nickname);
});

socket.on('message', (message) => createMessage(message));
socket.on('messagesList', (messagesList) => {
  messagesList.forEach((message) => createMessage(message));
});