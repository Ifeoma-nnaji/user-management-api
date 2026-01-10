const express = require('express');
const app = express();
//const appRoutes = require("./routes/rts")

app.use(express.json());
app.use("/", appRoutes);
