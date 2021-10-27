const username = document.querySelector('#userName');
const message = document.querySelector('#message');
const socket = window.io();

document.querySelector('#msg-submit').addEventListener('click', (event) => {
  console.log('funfou');
  event.preventDefault();
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  // const data = { nickname: username.innerHTML, message: message.value, timestamp: currentDate };
  console.log(data);
  socket.emit('sendmessage', { nickname: username.innerHTML, message: message.value, timestamp: currentDate });

// fetch('http://localhost:3000/create', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
//   .then((response) => response.json())
//   .catch((error) => {
//     console.error('Error:', error);
//   });
});

// document.querySelector;
const ramdomName = () => 'batata';
const changeName = (newName) => {
  const name = newName || ramdomName();
  return name;
};

document.querySelector('#userName').innerHTML = ramdomName();

document.querySelector('#nick-form').addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('funfou');
  const nick = document.querySelector('#nick');
  
  username.innerHTML = nick.value;
});
