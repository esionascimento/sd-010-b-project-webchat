const socket = window.io();

const formChat = document.getElementById('formChat');
const chatMessage = document.getElementById('messageInput');
  const usersUl = document.getElementById('userNames');
// const formNickname = document.getElementById('formNickname');
// const nickname = document.getElementById('nickname');

const nickname = usersUl.firstChild.innerText;

formChat.addEventListener('submit', (e) => {
    e.preventDefault();  
  socket.emit('message', { nickname, chatMessage: chatMessage.value });
  chatMessage.value = '';
  return false;
});

// formNickname.addEventListener('submit', (e) => {
//   e.preventDefault();
//   socket.emit('nickName', nickname.value);
//   nickname.value = '';
//   return false;
// });

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  
  li.innerText = message;
  messagesUl.appendChild(li);
};

// const createUser = (userName) => {
  // const usersUl = document.getElementById('userNames');
//   const li = document.createElement('li');
//   li.innerText = userName;
//   usersUl.appendChild(li);
// };

socket.on('message', (message) => {
  createMessage(message);
});

// socket.on('userName', (nick) => {
//   createUser(nick);
// });

socket.on('ola', (message) => createMessage(message));