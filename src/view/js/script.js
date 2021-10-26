const socket = window.io();

const sendButton = document.querySelector('#sendButton');
const messageInput = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameInput');
const chooseNickname = document.querySelector('#chooseNickname');
const userNickname = document.querySelector('#userNickname');
const messageList = document.querySelector('#messages');
/* const onlineUsers = document.querySelector('#onlineUsers'); */

const generateNickname = () => {
  let id = '';
  const alphabet = 'abcdefghijklmnopqrstuvwyxz';
  alphabet.split('').forEach(() => {
    if (id.length !== 16) {
      id += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
    }
  });
  return id;
};

let nickname = generateNickname();

chooseNickname.addEventListener('click', () => {
  nickname = nicknameInput.value;
  userNickname.textContent = nickname;
});

sendButton.addEventListener('click', () => {
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname });
});

const createMessage = (text) => {
  const message = document.createElement('li');
  message.textContent = text;
  message.setAttribute('data-testid', 'message');
  messageList.appendChild(message);
};

/* const createLoggedUser = (user) => {
  const bullet = document.createElement('li');
  bullet.textContent = user;
  bullet.setAttribute('data-testid', 'online-user');
  onlineUsers.appendChild(bullet);
};

const renderUsers = () => {

}; */

const renderMessages = (messages) => {
  messages.forEach((message) => {
    createMessage(message);
  });
};

const getMessages = async () => {
  fetch('http://localhost:3000/messages')
    .then((data) => data.json())
    .then((result) => renderMessages(result));
};

/* socket.on('logged', (user) => {

}); */

socket.on('message', (receivedMessage) => {
  createMessage(receivedMessage);
});

window.onload = async () => {
  userNickname.textContent = nickname;
  socket.emit('logged', nickname);
  await getMessages();
};
