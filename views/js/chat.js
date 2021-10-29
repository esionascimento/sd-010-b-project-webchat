const socket = window.io();

let nickname = Math.random().toString(16)
.substr(2, 8) + Math.random().toString(16).substr(2, 8);

const sendMessage = document.querySelector('.messages');
const message = document.querySelector('.messageInput');
const sendMessageBtn = document.querySelector('.btn2');
const usersList = document.querySelector('.users');
const changeNickname = document.querySelector('.userInput');
const changeNicknameBtn = document.querySelector('.btn1');

usersList.innerHTML = nickname;
const DataId = 'data-testid';

sendMessageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let chatMessage = message.value;
  if (chatMessage) {
    socket.emit('message', { chatMessage, nickname });
    chatMessage = '';
  }
});

changeNicknameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  nickname = changeNickname.value;
  usersList.innerHTML = nickname;
  changeNickname.value = '';
  socket.emit('loggedUser', {
    nickname,
  });
});

socket.on('message', (data) => {
  const li = document.createElement('li');
  li.setAttribute(DataId, 'message');
  li.innerHTML = data;
  sendMessage.appendChild(li);
});

socket.emit('loggedUser', { nickname });

socket.on('loggedUser', (data) => {
  usersList.innerHTML = '';
  data.forEach(({ nickname: nick, id }) => {
    const li = document.createElement('li');
    li.setAttribute(DataId, 'online-user');
    li.innerHTML = nick;
    if (id === socket.id) {
      usersList.prepend(li);
    } else usersList.appendChild(li);
  });
});

socket.on('allMessages', (messages) => {
  messages.forEach(({ timestamp, message: mensagem, nickname: name }) => {
    const li = document.createElement('li');
    li.setAttribute(DataId, 'message');
    li.innerHTML = `${timestamp} ${name} ${mensagem}`;
    sendMessage.appendChild(li);
  });
});