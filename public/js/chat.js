const socket = window.io();

const form = document.querySelector('form');
const chatMessage = document.querySelector('#messageInput');
const onlineUsers = document.querySelector('#online-list');
const ulmessage = document.querySelector('#messages');
const save = document.querySelector('#btn');
const dataTestid = 'data-testid';

let user;

socket.on('connected', (randomNickname) => {
  user = randomNickname;
  socket.emit('userNickname', user);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: chatMessage.value, nickname: user });
  chatMessage.value = '';
});

save.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('#inputName');
  user = input.value;
  socket.emit('updateNickname', user);
  input.value = '';
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(dataTestid, 'message');
  ulmessage.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

socket.on('messages', (messages) => {
  messages.forEach((msg) => createMessage(msg));
});

socket.on('users', (usersList) => {
  onlineUsers.innerHTML = '';
  const userLi = document.createElement('li');
  userLi.innerText = user;
  userLi.setAttribute('data-testid', 'online-user');
  onlineUsers.appendChild(userLi);
  usersList.forEach((element) => {
    if (element !== user) {
      const li = document.createElement('li');
      li.innerText = element;
      li.setAttribute(dataTestid, 'online-user');
      onlineUsers.appendChild(li);
    }
  });
});