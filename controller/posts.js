const post = require("../models/posts");
const { badReq } = require("../error");
const { notFound } = require("../error");

const getallpost = async (req, res) => {
  const posts = await post
    .find({ createdBy: req.user.userId })
    .sort("createdAt");
  res.status(200).json({ posts, count: posts.length });
};

const createpost = async (req, res) => {
  // const {company,status,position} = req.body;
  req.body.createdBy = req.user.userId;

  const posts = await post.create(req.body);
  res.status(200).json({ posts });
};

const getonepost = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const posts = await post.findOne({ _id: id, createdBy: userId });
  if (!posts) {
    throw new notFound(`no posts in this id ${id}`);
  }
  res.status(200).json({ posts });
};

const updatepost = async (req, res) => {
  const {
    body: { post: pos },
    params: { id },
    user: { userId },
  } = req;

  if (pos === "") {
    throw new badReq("posts fields shouldn't be empty");
  }
  const posts = await post.findByIdAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!posts) {
    throw new notFound(`there's no post with id ${id}`);
  }
  res.status(200).json({ posts });
};

const deletepost = async (req, res) => {
  const {
    params: { id },
    user: { id: userId },
  } = req;
  console.log(id);
  const posts = await post.findByIdAndRemove({ _id: id, createdBy: userId });
  if (!posts) {
    throw new notFound(`there's no job with id ${id}`);
  }
  res.status(200).send();
};

module.exports = {
  getallpost,
  createpost,
  getonepost,
  updatepost,
  deletepost,
};
