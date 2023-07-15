const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const bcrypt_secret = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userCheck = await User.findOne({ email });
  try {
    if (userCheck) {
      return res.status(400).json({ 'errorMessage': "Email Is Already In Use" });
    }
    const UserData = await User.create({
      name, email, password: bcrypt.hashSync(password, bcrypt_secret)
    })
    jwt.sign({ name, email, id: UserData._id }, process.env.JWT_SECREAT, {}, (err, token) => {
      if (err) throw err;
      return res.cookie('token', token).json(UserData);
    });
  } catch (e) {
    return res.status(422).json(e);
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userCheck = await User.findOne({ email }).select('+password');
  try {
    if (userCheck) {
      const pwdCheck = bcrypt.compareSync(password, userCheck.password);
      if (pwdCheck) {
        jwt.sign({ name: userCheck.name, email: userCheck.email, id: userCheck._id }, process.env.JWT_SECREAT, {}, (err, token) => {
          if (err) throw err;
          const userData = userCheck;
          delete userData.password;
          res.status(200).cookie('token', token).json(userData);
        })
      } else {
        res.status(400).json({ 'errorMessage': "Incorrect Email Or Password" });
      }
    } else {
      res.status(400).json({ 'errorMessage': "Email Not Found. Register If Don't Have Account" });
    }
  } catch (error) {
    res.status(422).json(error);
  }
}

exports.getUserProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECREAT, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
}