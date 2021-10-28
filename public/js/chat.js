const socket = window.io();

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const formMessage = document.querySelector('#formsMessage');
const formNickName = document.querySelector('#formsNickName');
const inputMessage = document.querySelector('#messageInput');
const inputNickName = document.querySelector('#nickInput');

const createLiUser = (name, userUl) => {
  const li = document.createElement('li');
  li.innerText = name;
  li.id = 'nickname';
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
};

const createUserOn = (nickname) => {
  const userUl = document.querySelector('#userson');
  console.log(`aqui${nickname}`);
  const listLi = [...document.querySelectorAll('#nickname')];
  console.log(listLi);
  const textArray = listLi.map((element) => element.innerText);
  const li = document.createElement('li');
  li.innerText = nickname[nickname.length - 1];
  li.id = 'nickname';
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
  nickname.forEach((name, index) => {
    if (index < (nickname.length - 1) && !textArray.includes(name)) {
      createLiUser(name, userUl);
    }
  });
};

const updateUserOn = (changeUser) => {
  // console.log(changeUser);
  const list = document.querySelectorAll('#nickname');
  // console.log(list);
  list.forEach((element) => {
    console.log(element.innerText); 
    const text = element.innerText;
    if (text.includes(changeUser.elementName)) {
      // console.log('aqui');
      const li = element;
      li.innerText = changeUser.nickname;
    }
  });
};

const updateUserOff = (name) => {
  // console.log(changeUser);
  const listUl = document.querySelector('#userson');
  const list = document.querySelectorAll('#nickname');
  console.log(list, name);
  // list.forEach((element) => {
  //   console.log(element.innerText); 
  //   const text = element.innerText;
  //   if (text.includes(name)) {
  //     // console.log('aqui');
  //   }
  // });
  listUl.removeChild(list[1]);
};

window.onload = () => {
  socket.emit('userOn', makeid(16)); 
};

// window.onbeforeunload = () => {
//   socket.disconnect();
// };

formMessage.addEventListener('submit', async (e) => {
  e.preventDefault();
  const li = document.querySelectorAll('#nickname');
  socket.emit('message', { chatMessage: inputMessage.value, nickname: li[0].innerText });
  await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: inputMessage.value, nickname: li[0].innerText }),
  });
  inputMessage.value = '';
  return false;
});

formNickName.addEventListener('submit', (e) => {
  e.preventDefault();
  const li = document.querySelectorAll('#nickname');
  socket.emit('updateUserOn', { nickname: inputNickName.value, elementName: li[0].innerText });
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  console.log(messagesUl);
  const li = document.createElement('li');
  console.log(li);
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('userOn', (nickname) => createUserOn(nickname));
socket.on('updateUserOn', (changeUser) => updateUserOn(changeUser));
socket.on('userOff', (name) => updateUserOff(name));