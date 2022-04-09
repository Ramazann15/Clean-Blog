const Posts = require('../models/Posts');

exports.getAllPost = async (req, res) => {
  const posts = await Posts.find({});
  res.render('index', {
    posts,
  });
};

exports.getPost = async (req, res) => {
  const post = await Posts.findById(req.params.id);
  res.render('post', {
    post,
  });
};
exports.createPost = async (req, res) => {
  await Posts.create(req.body);
  res.redirect('/');
};

exports.updadePost = async (req, res) => {
  const post = await Posts.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  await post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Posts.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
