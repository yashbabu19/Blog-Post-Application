const mongoose=require('mongoose')
const validator = require('validator')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User', new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }));
  module.exports=User
  