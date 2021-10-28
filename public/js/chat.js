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
const atri = `data-${'testid'}`;

const createLiUser = (name, userUl) => {
  const li = document.createElement('li');
  li.innerText = name;
  li.id = 'nickname';
  li.setAttribute(atri, 'online-user');
  userUl.appendChild(li);
};

const createUserOn = (users) => {
  const userUl = document.querySelector('#userson');
  console.log(`aqui${users}`);
  const listLi = [...document.querySelectorAll('#nickname')];
  console.log(listLi);
  const textArray = listLi.map((element) => element.innerText);
  console.log(textArray);
  const li = document.createElement('li');
  const name1 = users[users.length - 1];
  li.innerText = name1.nickname;
  li.id = 'nickname';
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
  users.forEach((name, index) => {
    if (index < (users.length - 1) && !textArray.includes(name.nickname)) {
      createLiUser(name.nickname, userUl);
    }
  });
};

const updateUserOn = (newName, pastName) => {
  console.log(newName, pastName);
  const list = document.querySelectorAll('#nickname');
 
  list.forEach((element) => {
    console.log(element.innerText); 
    const text = element.innerText;
    if (text.includes(pastName)) {
      const li = element;
      li.innerText = newName;
    }
  });
};

const updateUserOff = (name) => {
  const listUl = document.querySelector('#userson');
  const list = document.querySelectorAll('#nickname');
  console.log(list, name);
  list.forEach((element) => {
    console.log(element.innerText); 
    const text = element.innerText;
    if (text.includes(name)) {
      listUl.removeChild(list[1]);
    }
  });
};

window.onload = () => {
  socket.emit('userOn', makeid(16)); 
};

window.onbeforeunload = () => {
  socket.disconnect();
};

formMessage.addEventListener('submit', async (e) => {
  e.preventDefault();
  const li = document.querySelectorAll('#nickname');
  socket.emit('message', { chatMessage: inputMessage.value, nickname: li[0].innerText });
  inputMessage.value = '';
  return false;
});

formNickName.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('updateUserOn', inputNickName.value);
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  // console.log(li);
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('userOn', (nickname) => createUserOn(nickname));
socket.on('updateUserOn', (changeUser) => updateUserOn(changeUser.newName, changeUser.pastName));
socket.on('userOff', (name) => updateUserOff(name));