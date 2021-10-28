const socket = window.io();

const randonNumbers = Math.random().toString(16).substr(2, 8) + Math
  .random().toString(16).substr(2, 8);

let nickName = randonNumbers;
let oldNick = '';
let conectUsers = [];
conectUsers.push(nickName);
const DATA_TESTID = 'data-testid';

const inputMessage = document.getElementById('input-message');
const sendButton = document.getElementById('button-message');
const nickUser = document.getElementById('nick-name');
const ul = document.getElementById('ul-message');
const inputNick = document.getElementById('input-nick');
const changeNickButton = document.getElementById('button-nick');
const ulUserConect = document.getElementById('usersConect');
// nickUser.innerText = nickName;

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = nickName;
  const payload = { nickname, chatMessage };
  socket.emit('message', payload);
  inputMessage.value = '';
});

function userOnline() {
  socket.emit('UserOnline', [conectUsers, oldNick]);
}

window.onload = () => {
  userOnline();
};
changeNickButton.addEventListener('click', (e) => {
  e.preventDefault();
  oldNick = nickName;
  conectUsers = conectUsers.filter((element) => element !== nickName);
  const newNick = inputNick.value;
  conectUsers.unshift(newNick);
  userOnline();
  nickName = newNick;
  nickUser.innerText = nickName;
  inputNick.value = '';
});

function creatMessage(msg) {
  const li = document.createElement('li');
  li.innerHTML = msg;
  li.setAttribute(DATA_TESTID, 'message');
  ul.appendChild(li);
}

socket.on('message', (msg) => {
  creatMessage(msg);
});

socket.on('allUsers', (allUsers) => {
  ulUserConect.innerText = '';
  const newArray = allUsers.map((e) => e[0]);
  const firstnick = newArray.filter((e) => e !== nickName);
  [nickName, ...firstnick].filter((el) => el !== oldNick).forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element;
    li.setAttribute('data-testid', 'online-user');
    ulUserConect.appendChild(li);
    });
});
