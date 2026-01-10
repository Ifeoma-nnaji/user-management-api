const mysql = require("mysql2/promise"); //lets me use async/await with MySQL

const connPool = mysql.createPool({  // help me create a a reusable database connection
  host: "localhost",
  user: "root",
  password: "Nanoraexcel@94",
  database: "WeatherTickitingSyS",
});

module.exports = connPool;