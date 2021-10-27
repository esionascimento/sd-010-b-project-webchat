const socket = window.io();
const userList = document.getElementById('userList');
const messageList = document.getElementById('messageList');
const sendMessageButton = document.getElementById('sendButton');
const sendTextInput = document.getElementById('sendText');
const changeNicknameButton = document.getElementById('changeNickname');
const nickNameInput = document.getElementById('nickname');

let currentUser;

const insertElement = ({ el, type, content, id, cl, dt }) => {
  const newElement = document.createElement(type);
  newElement.textContent = content;
  if (cl) { newElement.classList.add(cl); }
  if (id) { newElement.id = id; }
  if (dt) { newElement.setAttribute('data-testid', dt); }
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
      dt: 'online-user',
    };
  insertElement(el);
  });
};
const renderMessage = (msg) => {
  const el = {
    el: messageList,
    type: 'li',
    content: msg, 
    dt: 'message',
  };
  insertElement(el);
};

const renderMessages = (msgs) => {
  msgs.forEach(({ message, nickname, timestamp }) => {
    const msg = `${timestamp} - ${nickname}: ${message}`;
    renderMessage(msg);
  });
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
const changeNickname = (e) => {
  e.preventDefault();
  const newNickname = nickNameInput.value;
  socket.emit('updateNickname', newNickname);
  nickNameInput.value = '';
};

sendMessageButton.addEventListener('click', sendMessage);
changeNicknameButton.addEventListener('click', changeNickname);

socket.on('newConnection', (users, user) => renderUsers(users, user));
socket.on('message', (msg) => renderMessage(msg));
socket.on('updateNickname', (users, user) => renderUsers(users, user));
socket.on('renderMessages', (messages) => renderMessages(messages));
