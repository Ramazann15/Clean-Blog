const Posts = require('../models/Posts');

exports.getAboutPage = (req, res) => {
  res.render('about');
};
exports.getAddPage = (req, res) => {
  res.render('add_post');
};

exports.getEditPage = async (req, res) => {
  const post = await Posts.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};
