const socket = window.io('http://localhost:3000');
const ID = '#user-name';

const formMessage = document.querySelector('.form-message');
formMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;
  const newMessage = target.querySelector('#message-box').value;
  const userName = document.querySelector(ID).innerText;
  
  socket.emit('message', { chatMessage: newMessage, nickname: userName });

  target.querySelector('#message-box').value = '';
});

const formUser = document.querySelector('.form-user');
formUser.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;
  const newNick = target.querySelector('#nickname-box').value;
  console.log(newNick);

  localStorage.setItem('userSeted', newNick);
  document.querySelector(ID).innerHTML = newNick;
  target.querySelector('#nickname-box').value = '';
});

// sockets events
socket.on('message', (message) => {
  const containerMessages = document.querySelector('.container-messages');
  const p = document.createElement('p');
  p.setAttribute('data-testid', 'message');
  p.innerText = message;

  containerMessages.appendChild(p);
});

socket.on('connected', (user) => {
  // colocar condição que testa se usuário existe no localstorge
  const userSeted = localStorage.getItem('userSeted');
  if (!userSeted) {
    document.querySelector(ID).innerHTML = user;
  } else {
    document.querySelector(ID).innerHTML = userSeted;
  }
});