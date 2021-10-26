require('dotenv').config();
const CustomExpress = require('./src/config/CustomExpress');

const PORT = process.env.PORT || 3000;
CustomExpress.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
