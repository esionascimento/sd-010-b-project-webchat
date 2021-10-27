  //   const socket = window.io();
  //   let nick = Math.random().toString(16)
  //   .substr(2, 8) + Math.random().toString(16).substr(2, 8);

  //     const ul = document.getElementById('ul-id');
  //     const inputMessage = document.getElementById('message');
  //     const btn1 = document.getElementById('enviar-btn');
  //     const userOn = document.getElementById('user-on');
  //     const inputNickname = document.getElementById('input-nickname');
  //     const btn2 = document.getElementById('enviar-btn2');
  //     userOn.innerText = nick;

  //     console.log(userOn);
  //   btn1.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   let chatMessage = inputMessage.value;
  //   if (chatMessage) {
  //     socket.emit('message', { chatMessage, nickname: nick });
  //     chatMessage = '';
  //   }
  // });

  // btn2.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   nick = inputNickname.value;
  //   userOn.innerText = nick;
  //   inputNickname.value = '';
  // });

  // socket.on('message', (message) => {
  //   const item = document.createElement('li');
  //   item.setAttribute('data-testid', 'message');
  //   item.innerText = message;
  //   ul.appendChild(item);
  // });