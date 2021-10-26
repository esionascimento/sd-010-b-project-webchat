const chat = (req, res) => {
  res.status(200).render('index.ejs');
};

module.exports = {
  chat,
};
