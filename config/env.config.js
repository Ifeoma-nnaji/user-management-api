const dotenv = require('dotenv');  //importing .env
dotenv.config();

const PORT = process.env.PORT;

module.exports = PORT;