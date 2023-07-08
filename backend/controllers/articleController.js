const ErrorHandler = require("../utils/errorHandler");
const catchError = require('../middleware/catchError'); //Catching Async Errors
const User = require('../models/userModel');
const generateToken = require('../utils/GenerateJWT_Token');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");

exports.getAllArticles = catchError(async (req, res, next) => {
  return res.json({"Jaydeep": "Smartest Guy In This Earth"});
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user
    });
  });