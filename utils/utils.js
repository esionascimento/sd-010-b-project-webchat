document.querySelector('#msg-submit').addEventListener('click', (event) => {
  console.log('funfou');
  event.preventDefault();
});

// document.querySelector;
const ramdomName = () => 'batata';
const changeName = (newName) => {
  const name = newName || ramdomName();
  return name;
};

document.querySelector('#userName').innerHTML = ramdomName();
