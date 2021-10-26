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

let NICKNAME = geraStringAleatoria(16);

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const formMessage = document.querySelector('#formMessage');
const inputMessage = document.querySelector('#messageInput');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname: NICKNAME });
  inputMessage.value = '';
  return false;
});

const nickName = document.querySelector('#online-user');
nickName.innerText = NICKNAME;

const formNick = document.querySelector('#formNick');
const inputNick = document.querySelector('#inputNick');

formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickName = inputNick.value;
  NICKNAME = newNickName;
  nickName.innerText = NICKNAME;
  inputNick.value = '';
  return false;
});

socket.on('message', (chatMessage) => createMessage(chatMessage));
