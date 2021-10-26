const socket = window.io();

const form = document.querySelector('form');
const chatMessage = document.querySelector('#messageInput');
const ulForm = document.querySelector('#ulForm');
const ulmessage = document.querySelector('#messages');

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

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  ulmessage.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

socket.on('messages', (messages) => {
  messages.forEach((msg) => createMessage(msg));
});

socket.on('users', (usersList) => {
  ulForm.innerHTML = '';
  const userLi = document.createElement('li');
  userLi.innerText = user;
  ulForm.appendChild(userLi);
  usersList.forEach((element) => {
    if (element !== user) {
      const li = document.createElement('li');
      li.innerText = element;
      ulForm.appendChild(li);
    }
  });
});