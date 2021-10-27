const socket = window.io();

socket.on('message', (string) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = string;
  document.getElementById('ul-msg').appendChild(li);
});

const btnSendMessage = document.getElementById('send-message');
const inputValue = document.getElementById('input-message');
btnSendMessage.addEventListener('click', (event) => {
  event.preventDefault();
  const chatMsg = inputValue.value;
  socket.emit('message', { nickname, chatMessage });
  inputValue.value = '';
});