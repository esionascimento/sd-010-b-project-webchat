const socket = window.io();

  let nickname = Math.random()
  .toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8); // agradecimentos Ederson Rodrigues PR: https://github.com/tryber/sd-010-b-project-webchat/pull/16

  // let arrayOnlineUsers = [];

    const btnEnviarMsg = document.getElementById('enviar-msg');
    const ulMsg = document.getElementById('ul-msg');
    // const nickTela = document.getElementById('nick-tela');
    // nickTela.innerText = nickname;
    const chatInput = document.getElementById('input-message');
    const newNick = document.getElementById('input-nick');
    const btnTrocarNick = document.getElementById('enviar-novo-nick');
    const ulOnlineUser = document.querySelector('#ul-online-user');

    socket.emit('userConnected', nickname);

    // socket.on('userConnected', (userList) => {
    //   arrayOnlineUsers = userList;
    // });

    btnEnviarMsg.addEventListener('click', (event) => {
      event.preventDefault();
      const chatMessage = chatInput.value;
      socket.emit('message', { nickname, chatMessage });
      chatInput.value = '';
    });

    btnTrocarNick.addEventListener('click', (event) => {
      event.preventDefault();
      const oldNick = nickname;
      nickname = newNick.value;
      // nickTela.innerText = nickname;
      newNick.value = '';
      socket.emit('nickUpdate', { nickname, oldNick });
      // userConnected();
    });

    socket.on('message', (string) => {
      const liMsg = document.createElement('li');
      liMsg.setAttribute('data-testid', 'message');
      liMsg.innerText = string;
      ulMsg.appendChild(liMsg);
    });

    socket.on('updateUserList', (array) => {
      ulOnlineUser.innerHTML = '';
      array.forEach((user) => {
        const liUser = document.createElement('li');
        liUser.setAttribute('data-testid', 'online-user');
        liUser.innerText = user.nickname;
        if (socket.id === user.id) {
          ulOnlineUser.prepend(liUser); // dica do Leandro Reis
        } else {
        ulOnlineUser.appendChild(liUser);
        }
    });
      }); 

    // socket.on('nickSwap', (array) => {
    //   ulOnlineUser.innerHTML = '';
    //   array.forEach((user) => {
    //     const liUser = document.createElement('li');
    //     liUser.setAttribute('data-testid', 'online-user');
    //     liUser.innerText = user;
    //     ulOnlineUser.appendChild(liUser);
    // });
    //   });
      
    // socket.on('newArrayNick', (array) => {});

    // window.onload = () => {
    //   userConnected();
    // };