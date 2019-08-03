const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => {
    console.log("connected to db!");
  })


//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);



const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server Up and running on port ${port}`));