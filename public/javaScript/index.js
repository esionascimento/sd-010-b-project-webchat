const socket = window.io();

const sendBtn = document.querySelector('.send');

sendBtn.addEventListener('click', () => {
  const inputMessage = document.querySelector('.msgtxt');
  const inputNickname = document.querySelector('.nickname');
  let nickname;
  if (inputNickname.value) {
    nickname = inputNickname.value;
  }
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  inputNickname.value = '';
});

socket.on('message', (message) => {
  const boxMessage = document.querySelector('.chat');
  const li = document.createElement('li');
  li.className = 'semStyle';
  li.innerHTML = message;
  boxMessage.appendChild(li);
});