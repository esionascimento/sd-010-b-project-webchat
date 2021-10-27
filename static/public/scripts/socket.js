const socket = window.io();
const userList = document.getElementById('userList');

const insertElement = (el, type, content, id, cl) => {
  const newElement = document.createElement(type);
  newElement.textContent = content;
  if (cl) { newElement.classList.add(cl); }
  if (id) { newElement.id = id; }
  const element = el;
  element.appendChild(newElement);
};

const renderUsers = (users) => {
  userList.innerHTML = '';
  users.forEach(({ userId, nickName }) => {
  insertElement(userList, 'li', nickName, userId);
  });
};

socket.on('username', (users) => renderUsers(users));
// socket.on('userDisconnected', (r) => {
//   console.log(r);
//   removeUser(r);
// });