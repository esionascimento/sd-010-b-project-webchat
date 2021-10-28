const socket = window.io();

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const formMessage = document.querySelector('#formsMessage');
const formNickName = document.querySelector('#formsNickName');
const inputMessage = document.querySelector('#messageInput');
const inputNickName = document.querySelector('#nickInput');
const nick = document.querySelector('#nickName');

window.onload = () => { nick.innerText = makeid(16); };

formMessage.addEventListener('submit', async (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: nick.innerText });
  await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: inputMessage.value, nickname: nick.innerText }),
  });
  inputMessage.value = '';
  return false;
});

formNickName.addEventListener('submit', (e) => {
  e.preventDefault();
  nick.innerText = inputNickName.value;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));