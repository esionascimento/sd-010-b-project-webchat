const socket = window.io();

// const changeNickButton = document.getElementById('nick-button');
// const changeNickInput = document.getElementById('nick-input');
const nick = document.getElementById('nicknameList');
const form = document.getElementById('form');
const input = document.getElementById('input');
const nickname = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      const messageObj = {
        nickname,
        chatMessage: input.value,
      };
      input.value = '';
      socket.emit('message', messageObj);
    }
  });

  socket.on('welcome', (data) => {
    console.log(data);
    const item = document.createElement('li');
    item.textContent = data;
    item.setAttribute('data-testid', 'online-user');
    nick.appendChild(item);
  });

  socket.on('message', (data) => {
    const div = document.createElement('div');
    div.textContent = data;
    div.setAttribute('data-testid', 'message');
    document.getElementById('message-container').append(div);   
  });

// changeNickButton.addEventListener('click', () => {
//   const nick = changeNickInput.value;
// });
