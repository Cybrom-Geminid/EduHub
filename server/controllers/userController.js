const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {
  //console.log("test ",req.body)
  const { name, email,role,password } = req.body;
  //console.log("test 2",req.body)
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
// console.log('Received email:', email); // Debugging log
//   console.log('Received password:', password); // Debugging log

  try {
    const user = await User.findOne({ email });
    //console.log('User found:', user); // Debugging log

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Debugging log
      if (isMatch) {
        
        const data=jwt.sign({email:user.email,name:user.name,role:user.role,id:user._id},"RESTFULAPIs")
        
        return res.json({token:data})
       
      } else {
        //console.log('Invalid password'); // Debugging log
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      //console.log('User not found'); // Debugging log
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    //console.error('Authentication error:', error); // Debugging log
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = { registerUser, authUser};