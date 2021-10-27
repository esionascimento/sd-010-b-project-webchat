const getDate = (nickname, chatMessage) => {
    const date = new Date();
    // https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/
    const dataAtual = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const horaAtual = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const dados = `${dataAtual} ${horaAtual}  - ${nickname}: ${chatMessage}`;
    return dados;
};
module.exports = { getDate };