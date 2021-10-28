const todayDate = () => {
    const date = new Date();
        const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const minutes = date.getMinutes();
        const hourAndMinute = `${date.getHours()}:${minutes}:${date.getSeconds()}`; 
        return data + hourAndMinute;
        };

const hoursAndMinutes = () => {
    const date = new Date();
    let minutes = date.getMinutes();

    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    
const hourAndMinute = `${date.getHours()}:${minutes}:${date.getSeconds()}`; 
    return hourAndMinute;
    };

module.exports = { todayDate, hoursAndMinutes };
