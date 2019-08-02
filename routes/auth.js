const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
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
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Save the user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser)
  } catch (err) {
    res.send(400).send(err)
  }

})


module.exports = router;