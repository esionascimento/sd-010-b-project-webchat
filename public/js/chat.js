const socket = window.io();

const ulMessages = document.querySelector('#list-message');
const ulUsers = document.querySelector('#list-nickname');

const createMessage = (message) => {
  const li = document.createElement('li');
  li.classList = 'data-testid="message"';
  li.innerText = message;
  ulMessages.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.classList = 'data-testid="message"';
  li.innerText = user;
  ulUsers.appendChild(li);
};

socket.on('newUser', ({ user, historicMessages }) => {
  createUser(user);
  historicMessages.forEach((e) => createMessage(e));
});
