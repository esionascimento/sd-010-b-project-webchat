const socket = window.io('http://localhost:3000');

const formMessage = document.querySelector('.form-message');
formMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = event.target.querySelector('.new-message').value;

  socket.emit('message', { chatMessage: newMessage, nickname: '' });
});

socket.on('message', (message) => {
  console.log(message);
});