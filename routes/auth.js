const router = require("express").Router();
const User = require('../model/User');


//Validation
const Joi = require('joi');
const schema = {
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
}



router.post("/register", async (req, res) => {

  //Validate the data
  const { error } = Joi.validate(req.body, schema);

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

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