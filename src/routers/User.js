const express = require('express')

const User = require('../models/User')
const auth = require('../middleware/auth')

const router = new express.Router()
// Signup route
app.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
  
    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(500).json({error: 'Error hashing password'});
      } else {
        // Create a new user
        const user = new User({username, email, password: hashedPassword});
        user.save((error, user) => {
          if (error) {
            res.status(500).json({error: 'Error saving user'});
          } else {
            res.json({message: 'User created successfully'});
          }
        });
      }
    });
  });
  
  // Login route
  app.post('/login', (req, res) => {
    const {email, password} = req.body;
  
    // Find the user by email
    User.findOne({email}, (err, user) => {
      if (err) {
        res.status(500).json({error: 'Error finding user'});
      } else if (!user) {
        res.status(404).json({error: 'User not found'});
      } else {
        // Compare the password
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) {
            res.status(500).json({error: 'Error comparing password'});
          } else if (!isMatch) {
            res.status(401).json({error: 'Incorrect password'});
          } else {
            // Create a JWT
            const token = jwt.sign({userId: user._id}, 'secretkey');
            res.json({message: 'Logged in successfully', token});
          }
        });
      }
    });
  });
  //password reset route
  router.post("/password-reset", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ error: "No user found with that email" });
      }
      const resetToken = await user.createPasswordResetToken();
      await user.save();
      // send email with reset link
      res.status(200).send({ message: "Password reset link sent" });
    } catch (error) {
      res.status(500).send({ error: "Error resetting password" });
    }
  });
  