require('dotenv').config();
const express = require("express");
const app = express();
const appRoutes = require("./routes/rts");

app.use(express.json());
app.use("/", appRoutes); 

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});


