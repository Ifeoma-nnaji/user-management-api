const express = require('express');  
const app = express(); 
//const appRoutes = require("./routes/rts")

app.use(express.json()); //Allows your server to read JSON data from requests.
app.use("/", appRoutes);

app.listen(4000, () => {
  console.log("server is running on port 4000")
}); // Starts the server on port 4000.
