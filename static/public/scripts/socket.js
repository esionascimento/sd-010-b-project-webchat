const socket = window.io();
const userList = document.getElementById('userList');
const messageList = document.getElementById('messageList');
const sendMessageButton = document.getElementById('sendButton');
const sendTextInput = document.getElementById('sendText');

let currentUser;

const insertElement = ({ el, type, content, id, cl }) => {
  const newElement = document.createElement(type);
  newElement.textContent = content;
  if (cl) { newElement.classList.add(cl); }
  if (id) { newElement.id = id; }
  const element = el;
  element.appendChild(newElement);
};

const renderUsers = (users, user) => {
  currentUser = user;
  userList.innerHTML = '';
  users.forEach(({ userId, nickName }) => {
    const el = {
      el: userList,
      type: 'li',
      content: nickName,
      id: userId,
    };
  insertElement(el);
  });
};

const renderMessage = (msg) => {
  console.log(msg);
  const el = {
    el: messageList,
    type: 'li',
    content: msg, 
  };
  insertElement(el);
};

const sendMessage = (e) => {
  e.preventDefault();
  const payload = {
    nickname: currentUser.nickName,
    chatMessage: sendTextInput.value,
  };
  socket.emit('message', payload);
  sendTextInput.value = '';
};

sendMessageButton.addEventListener('click', sendMessage);

socket.on('newConnection', (users, user) => renderUsers(users, user));
socket.on('message', (msg) => renderMessage(msg));
