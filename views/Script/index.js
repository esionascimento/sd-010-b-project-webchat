const socket = window.io();

const randonNumbers = String(Math.random().toString(32).slice(2));
const nickName = `User-${randonNumbers}`;

const inputMessage = document.getElementById('input-message');
const sendButton = document.getElementById('button-message');
const nickUser = document.getElementById('nick-name');
const ul = document.getElementById('ul-message');
const inputNick = document.getElementById('input-nick');
const chageNickButton = document.getElementById('button-nick');
nickUser.innerText = nickName;

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const payload = { nickName, chatMessage };
  socket.emit('SendMessage', payload);
 // inputMessage.value('');
});

changeNickButton.addEventListener('click', (e) => {

});

socket.on('ReciveMessage', (msg) => {
  console.log(msg);
  const li = document.createElement('li');
  li.innerHTML = msg;
  ul.appendChild(li);
});
