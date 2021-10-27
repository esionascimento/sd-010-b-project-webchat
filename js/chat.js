const socket = window.io();

// função obtida no site:
// https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/

const generateNickname = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) { 
    text += possible.charAt(Math.floor(Math.random() * possible.length)); 
  }
  return text;
};

let nickname = generateNickname(16);

const formNickname = document.getElementById('formNickname');
const inputNickname = document.getElementById('inputNickname');
const formChat = document.getElementById('formChat');
const messageInput = document.getElementById('messageInput');
const messagesUl = document.getElementById('messages');

window.onload = () => {
  socket.emit('nickname', nickname);
  sessionStorage.setItem('nickname', nickname);
};

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputNickname.value) {
    socket.emit('newNickname', 
      { newNick: inputNickname.value,
        nickname,
      });
      nickname = inputNickname.value;
      sessionStorage.setItem('nickname', nickname);
    inputNickname.value = '';
  }
  return false;
});

formChat.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit('message', 
      { nickname, 
        chatMessage: messageInput.value,
      });
      messageInput.value = '';
  }
  return false;
});

const createUser = (userName) => {
  const usersUl = document.getElementById('userNames');
  const getNickname = sessionStorage.getItem('nickname');
  let newUsers = '';

  const nickNames = userName.filter((user) => user !== getNickname);
  nickNames.unshift(getNickname);

  nickNames.forEach((nick) => {
    newUsers += `<li data-testid="online-user">${nick}</li>`;
  });
  usersUl.innerHTML = newUsers;
};

const createMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const renderMessages = (messages) => {
  messages.forEach((message) => {
    createMessage(message);
  });
};

socket.on('nickname', (nicks) => createUser(nicks));
socket.on('message', (message) => createMessage(message));
socket.on('getMessages', (messages) => renderMessages(messages));