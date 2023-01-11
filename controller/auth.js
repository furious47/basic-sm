const user = require("../models/auth");
const { badReq, noAuth } = require("../error");

const register = async (req, res) => {
  const users = await user.create({ ...req.body });
  const token = users.tokenCreate();
  res.status(200).json({ users, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new badReq("pls provide email and password");
  }
  const users = await user.findOne({ email });

  if (!users) {
    throw new noAuth("invalid credentials");
  }

  const ispassword = await users.checkPass(password);
  if (!ispassword) {
    throw new noAuth("invalid password");
  }

  const token = users.tokenCreate();

  res.status(200).json({ name: users.name, token });
};

module.exports = { register, login };
