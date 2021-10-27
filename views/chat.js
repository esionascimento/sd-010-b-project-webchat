const socket = window.io();
socket.on('message', (message) => {
  console.log(message);
});
const messageText = document.getElementById('msg');

messageText.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const msg = e.target.value;
    console.log(msg);
  }
});