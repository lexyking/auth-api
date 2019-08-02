const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lexy:alexandre@auth-api-2ekny.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("connected to db!");
  })


//Import Routes
const authRoute = require("./routes/auth");

//Route Middlewares
app.use("/api/user", authRoute);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server Up and running on port ${port}`));