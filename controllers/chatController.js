const chat = (req, res) => {
  const { nickname } = req.query;
  res.render('chat', { nickname });
};

module.exports = {
  chat,
};