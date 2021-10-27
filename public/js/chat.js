const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#message-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { message: inputMessage.value, nickname: 'padrão' });
  inputMessage.value = '';
  return false;
});