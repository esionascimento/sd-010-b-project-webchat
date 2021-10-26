const socket = window.io();

const generateNickname = () => {
  let id = '';
  const alphabet = 'abcdefghijklmnopqrstuvwyxz';
  alphabet.split('').forEach(() => {
    if (id.length !== 16) {
      id += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
    }
  });
  return id;
};

const nickname = generateNickname();

const sendButton = document.querySelector('#sendButton');
const messageInput = document.querySelector('#messageInput');

sendButton.addEventListener('click', () => {
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname });
});

socket.on('message');
