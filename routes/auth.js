const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');




router.post("/register", async (req, res) => {

  //Validate the data
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check if the email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Save the user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser)
  } catch (err) {
    res.send(400).send(err)
  }

})


router.post("/login", async (req, res) => {
  //Validate the data
  const { error } = loginValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check if the email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Wrong Email !");
  }

  //Check the hashed password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Wrong password !")
  }

  //Create the token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("Auth-token", token).send(token);

  // try {
  //   res.status(200).send("Logged in!")
  // } catch (err) {
  //   res.send(400).send(err)
  // }
})


module.exports = router;