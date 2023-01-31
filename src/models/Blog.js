const mongoose = require('mongoose')
const BlogPost = mongoose.model('BlogPost', new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }));
  module.exports = BlogPost