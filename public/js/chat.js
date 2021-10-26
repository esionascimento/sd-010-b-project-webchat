const socket = window.io();

const form = document.querySelector('#send-message');
const inputMessage = document.querySelector('#send-message-input');
const ulList = document.querySelector('#messages-list');
// const saveBtn = document.querySelector('#save-btn');
const formNick = document.querySelector('#form-nick');
const nickInput = document.querySelector('#nick-input');
const ulUserList = document.querySelector('#user-list');
// const getCurrentTime = require('../utils/getTime');
const TESTID = 'data-testid';

const randomNick =
  Math.random().toString(36).substring(2, 10) +
  Math.random().toString(36).substring(2, 10);

const createUser = (users, msgs = []) => {
  // createHistory(msgs);
  ulUserList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.setAttribute(TESTID, 'online-user');
    li.textContent = user.nick;
    ulUserList.appendChild(li);
  });
};

socket.on('newUser', ({ users, msgs }) => createUser(users, msgs));
socket.emit('newUser', randomNick);
