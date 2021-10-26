const socket = window.io();

  let nickname = Math.random()
  .toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8); // agradecimentos Ederson Rodrigues PR: https://github.com/tryber/sd-010-b-project-webchat/pull/16

    const btnEnviarMsg = document.getElementById('enviar-msg');
    const ulMsg = document.getElementById('ul-msg');
    const nickTela = document.getElementById('nick-tela');
    nickTela.innerText = nickname;
    const chatInput = document.getElementById('input-message');
    const newNick = document.getElementById('input-nick');
    const btnTrocarNick = document.getElementById('enviar-novo-nick');

    btnEnviarMsg.addEventListener('click', (event) => {
      event.preventDefault();
      const chatMessage = chatInput.value;
      socket.emit('message', { nickname, chatMessage });
      chatInput.value = '';
    });

    btnTrocarNick.addEventListener('click', (event) => {
      event.preventDefault();
      nickname = newNick.value;
      nickTela.innerText = nickname;
      newNick.value = '';
    });

    socket.on('message', (string) => {
      const liMsg = document.createElement('li');
      liMsg.setAttribute('data-testid', 'message');
      liMsg.innerText = string;
      ulMsg.appendChild(liMsg);
    });