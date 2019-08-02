const router = require("express").Router();
const User = require('../model/User');
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
  //Save the user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser)
  } catch (err) {
    res.send(400).send(err)
  }

})


module.exports = router;