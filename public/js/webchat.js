const socket = window.io();

// fonte : https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
function geraStringAleatoria(tamanho) {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < tamanho; i += 1) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}

let nickname = geraStringAleatoria(16);

const fillUl = (message, id, dataTest, classname) => {
  const messagesUl = document.querySelector(`#${id}`);
  const li = document.createElement('li');
  li.innerText = message;
  if (classname) li.className = classname;
  li.setAttribute('data-testid', dataTest);
  messagesUl.appendChild(li);
};

const formMessage = document.querySelector('#formMessage');
const inputMessage = document.querySelector('#messageInput');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

// const storeNickName = document.querySelector('#online-user');
// storeNickName.innerText = nickname;

const formNick = document.querySelector('#formNick');
const inputNick = document.querySelector('#inputNick');

formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickName = inputNick.value;
  const oldNick = nickname;
  nickname = newNickName;
  socket.emit('updateUserList', { oldNick, nickname });
  inputNick.value = '';
  return false;
});

socket.on('message', (chatMessage) => fillUl(chatMessage, 'messages', 'message'));

socket.on('LoadOldMessages', ({ oldMessages }) => {
  oldMessages.forEach((chatMessage) => {
    fillUl(chatMessage, 'messages', 'message', 'message');
  });
});

socket.on('loadUserList', (onlineUsers) => {
  document.querySelector('#listOnlineUsers').innerHTML = '';
  onlineUsers.forEach((user) => {
    fillUl(user, 'listOnlineUsers', 'online-user');
  });
});

socket.on('updateUserList', (onlineUsers) => {
  document.querySelector('#listOnlineUsers').innerHTML = '';
  onlineUsers.splice(onlineUsers.indexOf(nickname), 1);
  onlineUsers.unshift(nickname);
  onlineUsers.forEach((user) => {
    fillUl(user, 'listOnlineUsers', 'online-user');
  });
});

socket.emit('addUserList', { nickname });

window.onbeforeunload = (_e) => {
  socket.disconnect();
};