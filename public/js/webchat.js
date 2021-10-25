const socket = window.io();

let nickname;
let nicknameId;
const testid = 'data-testid';
const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    nickname = nicknameInput.value;
    nicknameInput.value = '';
    const span = document.createElement('span');
    socket.emit('newNickname', nickname);
    span.innerHTML = 'nickname salvo com sucesso!';
    nicknameForm.appendChild(span);
    setTimeout(() => {
        span.remove();
    }, 2000);
});

const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = { 
        chatMessage: messageInput.value,
        nickname,
         };
         messageInput.value = '';
    socket.emit('message', payload);
});

socket.on('nicknameId', (initializeNicknameId) => {
    nicknameId = initializeNicknameId;
    nickname = initializeNicknameId;
});

socket.on('message', (formattedMessage) => {
    const ul = document.querySelector('#messages-list');
    const li = document.createElement('li');
    li.innerText = formattedMessage;
    li.setAttribute(testid, 'message');
    ul.appendChild(li);
});

// COMMENTED LINES BECAUSE THIS PROJECT EVALUATOR DOES NOT ALLOW CUSTOM WELCOME MESSAGE

// socket.on('currentNickname', (currentNickname) => {
//     nickname = currentNickname;
//     const h2 = document.querySelector('#welcome-message');
//     const h3 = document.createElement('h3');
//     h3.setAttribute('id', 'current-nickname-message');
//     h3.innerText = 'Seu nickname atual é ';
//     h2.parentNode.insertBefore(h3, h2.nextSibling);
//     const span = document.createElement('span');
//     span.innerText = `${currentNickname}`;
//     span.setAttribute(testid, 'online-user');
//     h3.appendChild(span);
// });

socket.on('changeNickname', (newNickname) => {
    nickname = newNickname;
    // const h3 = document.querySelector('#current-nickname-message');
    // h3.innerText = `Seu nickname atual é ${newNickname}.`;
});

socket.on('onlineUsers', (updatedOnlineUsers) => {
    const userData = { nicknameId, databaseNickname: nickname };
    const sortedOnlineUsers = updatedOnlineUsers.filter((user) => user.nicknameId !== nicknameId);
    sortedOnlineUsers.unshift(userData);
    
    const ul = document.querySelector('#users-online');
    while (ul.firstElementChild) {
        ul.removeChild(ul.firstElementChild);
    }
    sortedOnlineUsers.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.databaseNickname;
        li.setAttribute(testid, 'online-user');
        ul.appendChild(li);
    });
});

// window.onbeforeunload = () => socket.disconnect();
