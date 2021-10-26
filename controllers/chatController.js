const getChat = async (req, res) => {
  res.status(200).render('chat');
};

module.exports = { getChat };