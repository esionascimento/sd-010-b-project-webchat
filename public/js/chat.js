const socket = window.io();

const formMessage = document.querySelector('#formsMessage');
const formNickName = document.querySelector('#formsNickName');
const inputMessage = document.querySelector('#messageInput');
const inputNickName = document.querySelector('#nickInput');
const atri = `data-${'testid'}`;
const names = [
   
  'Nancy Reis', 
  'Roberta Reis', 
  'Lê Aragão',
  'Fábio Nunes',
];

const colors = [
  'red', 
  'yellow', 
  'green', 
  'blue', 
  'purple', 
  'pink',
];

const createLiUser = (name, color, userUl) => {
  const li = document.createElement('li');
  li.className = 'bg-gray-900 sm:rounded-2xl';
  li.innerHTML = `<div class="mt-2 flex items-center p-2 text-${color}-300">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
  </svg>
  <p class="ml-2">${name}</p>
  </div>`;
  li.id = 'nickname';
  li.setAttribute(atri, 'online-user');
  userUl.appendChild(li);
};

const createUserOn = (users) => {
  const userUl = document.querySelector('#userson');
  console.log(`aqui${users}`);
  const listLi = [...document.querySelectorAll('#nickname')];
  // console.log(listLi);
  const textArray = listLi.map((element) => element.innerText);
  // console.log(textArray);
  const li = document.createElement('li');
  const name1 = users[users.length - 1];
  li.className = 'bg-gray-900 sm:rounded-2xl';
  li.innerHTML = `<div class="mt-2 flex items-center p-2 text-${name1.color}-300">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
  </svg>
  <p id="nameCreated" class="ml-2">${name1.nickname}</p>
  </div>`;
  li.id = 'nickname';
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
  users.forEach((name, index) => {
    if (index < (users.length - 1) && !textArray.includes(name.nickname)) {
      createLiUser(name.nickname, name.color, userUl);
    }
  });
};

const updateUserOn = (newName, pastName) => {
  // console.log(newName, pastName);
  const list = document.querySelectorAll('#nameCreated');
 
  list.forEach((element) => {
    // console.log(element.innerText); 
    const text = element.innerText;
    if (text.includes(pastName)) {
      const li = element;
      li.innerText = newName;
    }
  });

  inputNickName.value = '';
};

const updateUserOff = (name) => {
  const listUl = document.querySelector('#userson');
  const list = document.querySelectorAll('#nickname');
  // console.log(list, name);
  list.forEach((element) => {
    // console.log(element.innerText); 
    const text = element.innerText;
    if (text.includes(name)) {
      listUl.removeChild(list[1]);
    }
  });
};

window.onload = () => {
  socket.emit('userOn', { 
    name: names[Math.floor(Math.random() * (names.length - 1))], 
    color: colors[Math.floor(Math.random() * (colors.length - 1))] }); 
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
  const box = document.querySelector('#box-message');
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  const list = document.querySelectorAll('#nickname');
  if (list[0].innerText === message.pessoa.nickname) {
    li.className = 'mt-6 mb-2 ml-52 text-gray-50 bg-gray-900 shadow-2xl rounded-bl-lg rounded-t-lg  p-3';
    li.innerHTML = `<div class="border-${message.pessoa.color}-300 border-2 rounded-bl-lg rounded-t-lg p-3">
      <p class="w-full text-${message.pessoa.color}-300 pb-2 border-b-2 border-${message.pessoa.color}-300">${message.pessoa.nickname}</p>
      <p class="mt-3">${message.message}</p>
      <p class="mt-2 flex justify-end opacity-40 text-xs">${message.date}</p>
    </div>`;
  } else {
    li.className = 'mt-6 mb-2 mr-52 text-gray-50 bg-gray-900 shadow-2xl rounded-br-lg rounded-t-lg p-3';
    li.innerHTML = `<div class="border-${message.pessoa.color}-300 border-2 rounded-br-lg rounded-t-lg p-3">
      <p class="w-full text-${message.pessoa.color}-300 pb-2 border-b-2 border-${message.pessoa.color}-300">${message.pessoa.nickname}</p>
      <p class="mt-3">${message.message}</p>
      <p class="mt-2 flex justify-end opacity-40 text-xs">${message.date}</p>
    </div>`;
  }
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
  const height = box.scrollHeight;
  console.log(height, box);
  box.scrollTop = height;
};

socket.on('message', (message) => createMessage(message));
socket.on('userOn', (nickname) => createUserOn(nickname));
socket.on('updateUserOn', (changeUser) => updateUserOn(changeUser.newName, changeUser.pastName));
socket.on('userOff', (name) => updateUserOff(name));