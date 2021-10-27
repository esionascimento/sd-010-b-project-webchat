// função obtida no site:
// https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/

const generateNickname = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
  for (let i = 0; i < 16; i += 1) { 
    text += possible.charAt(Math.floor(Math.random() * possible.length)); 
  }

  return text;
};

module.exports = generateNickname;