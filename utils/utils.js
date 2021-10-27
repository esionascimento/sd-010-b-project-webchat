const socket = window.io();

const username = document.querySelector('#userName');
const message = document.querySelector('#message');

const ramdomName = () => 'batata';
  document.querySelector('#userName').innerHTML = ramdomName();

document.querySelector('#msg-submit').addEventListener('click', (event) => {
  console.log('funfou');
  event.preventDefault();
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const data = { nickname: username.innerHTML, message: message.value, timestamp: currentDate };
  console.log(data);
  socket.emit('sendmessage', { nickname: username.innerHTML, message: message.value, timestamp: currentDate });
});

document.querySelector('#nick-form').addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('funfou');
  const nick = document.querySelector('#nick');
  
  username.innerHTML = nick.value;
});

socket.on('refreshMessages', ((data) => {
  data.map(({ nickname }) => {
    const li = document.createElement('li');
    li.innerHTML = nickname;
    return document.querySelector('#username-list').append(li);
  });
}));