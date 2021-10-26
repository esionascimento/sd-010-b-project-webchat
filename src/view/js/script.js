const socket = window.io();

const sendButton = document.querySelector('#sendButton');
const messageInput = document.querySelector('#messageInput');
const nicknameDisplay = document.querySelector('#userNickname');

const isNewUser = () => {

};

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

const olderOrNewerUser = () => {
  const sessionNickname = sessionStorage
};

sendButton.addEventListener('click', () => {
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname });
});

socket.on('message', (message) => {

});

window.onload = () => {

};
