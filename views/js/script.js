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
  const DATAID = 'data-testid';

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

socket.on('message', (sms) => {
  const liItem = document.createElement('li');
  liItem.setAttribute(DATAID, 'message');
  liItem.innerText = sms;
  ul.appendChild(liItem);
});

socket.emit('userOn', { nickname });

socket.on('userOn', (allUsers) => {
  userOn.innerHTML = '';
  allUsers.forEach(({ nickname: nick, id }) => {
    const liUser = document.createElement('li');
    liUser.setAttribute(DATAID, 'online-user');
    liUser.innerText = nick;
    if (id === socket.id) { userOn.prepend(liUser); } else userOn.appendChild(liUser);
  });
});

socket.on('messageAll', (allMessages) => {
  console.log(allMessages);
  allMessages.forEach(({ timestamp, message, nickname: apelido }) => {
    const oldItem = document.createElement('li');
    oldItem.setAttribute(DATAID, 'message');
    oldItem.innerText = `${timestamp} - ${apelido} ${message}`;
    ul.appendChild(oldItem);
  });
});