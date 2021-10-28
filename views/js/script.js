const socket = window.io();
let nickname = Math.random().toString(16)
.substr(2, 8) + Math.random().toString(16).substr(2, 8);

  const ul = document.getElementById('ul-id');
  const inputMessage = document.getElementById('message');
  const btn1 = document.getElementById('enviar-btn');
  const userOn = document.getElementById('user-on');
  const inputNickname = document.getElementById('input-nickname');
  const btn2 = document.getElementById('enviar-btn2');
  userOn.innerText = nickname;

btn1.addEventListener('click', (e) => {
e.preventDefault();
let chatMessage = inputMessage.value;
if (chatMessage) {
  socket.emit('message', { chatMessage, nickname });
  chatMessage = '';
}
});

btn2.addEventListener('click', (e) => {
e.preventDefault();
nickname = inputNickname.value;
userOn.innerText = nickname;
inputNickname.value = '';
socket.emit('userOn', { nickname });
});

socket.on('message', (message) => {
const liItem = document.createElement('li');
liItem.setAttribute('data-testid', 'message');
liItem.innerText = message;
ul.appendChild(liItem);
});

socket.emit('userOn', { nickname });

socket.on('userOn', (allUsers) => {
  userOn.innerHTML = '';
  allUsers.forEach(({ nickname: nick, id }) => {
    const liUser = document.createElement('li');
    liUser.setAttribute('data-testid', 'online-user');
    liUser.innerText = nick;
    if (id === socket.id) { userOn.prepend(liUser); } else userOn.appendChild(liUser);
  });
});

// socket.on('newNick');