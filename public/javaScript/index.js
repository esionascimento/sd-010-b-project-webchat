const socket = window.io();

const sendBtn = document.querySelector('.send');
const nicknameBtn = document.querySelector('.btn_nickname');
const clientName = document.querySelector('.name');
let nickname;

const createNickname = (tamanho) => {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < tamanho; i += 1) {
  stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}; 

const createMessage = () => {
  const li = document.createElement('li');
  li.className = 'semStyle';
  li.setAttribute('data-testid', 'message');
  return li;
};

const UserNickname = createNickname(16);
clientName.innerHTML = UserNickname;
nickname = UserNickname;

nicknameBtn.addEventListener('click', () => {
  const inputNewNickname = document.querySelector('.nickname').value;
  clientName.innerHTML = inputNewNickname;
  nickname = inputNewNickname;
  inputNewNickname.value = '';
});

const saveMessages = (body) => {
  const url = 'http://localhost:3000';
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(body));
  request.onload = function ok() {
    console.log(this.responseText);
  };
};

sendBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const inputMessage = document.querySelector('.msgtxt');
  const message = { message: inputMessage.value, nickname };
  saveMessages(message);
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
});

socket.on('message', (message) => {
  const boxMessage = document.querySelector('.chat');
  const li = createMessage();
  li.innerHTML = message;
  sessionStorage.setItem('message', message);
  console.log(message);
  boxMessage.appendChild(li);
});
