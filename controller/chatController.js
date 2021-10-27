// const model = require('../models/messageModel.js');
const get = (_req, res) => res.status(200).render('chat');

// const create = (req, res) => {
//     const newMessage = model.create(message);
//     res.status(200).render('chat');
// };

module.exports = {
    get,
    // create,
};