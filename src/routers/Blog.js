const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

// Get all blogs (default route, returns 10 blogs from page 1)
router.get("/", (req, res) => {
let page = req.query.page || 1;
Blog.find({})
.skip((page - 1) * 10)
.limit(10)
.then((blogs) => {
res.json(blogs);
})
.catch((err) => {
res.status(500).json({ message: err });
});
});

// Create a new blog (authentication required)
router.post("/", auth, (req, res) => {
let newBlog = new Blog({
title: req.body.title,
content: req.body.content,
});
newBlog
.save()
.then((blog) => {
res.status(201).json(blog);
})
.catch((err) => {
res.status(500).json({ message: err });
});
});

// Update a blog (authentication required)
router.put("/:id", auth, (req, res) => {
Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
.then((blog) => {
res.json(blog);
})
.catch((err) => {
res.status(500).json({ message: err });
});
});

// Delete a blog (authentication required)
router.delete("/:id", auth, (req, res) => {
Blog.findByIdAndDelete(req.params.id)
.then((blog) => {
res.json(blog);
})
.catch((err) => {
res.status(500).json({ message: err });
});
});

module.exports = router;