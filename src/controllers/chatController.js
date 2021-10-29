const chatController = async (req, res) => {
  try {
    res.status(200).render('index');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = chatController;
