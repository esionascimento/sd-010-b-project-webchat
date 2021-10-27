const createMessageLi = (fullMessage) => {
  const ul = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = fullMessage;
  ul.appendChild(li);
};

module.exports = { createMessageLi };