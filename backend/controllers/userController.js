const User = require('../models/User');

exports.getProfile = async (req,res) => {
  const user = await User.findById(req.user._id).select('-password -otp');
  res.json({ user });
};

exports.updateProfile = async (req,res) => {
  const { username } = req.body;
  const user = await User.findById(req.user._id);
  if(username) user.username = username;
  await user.save();
  res.json({ user: { username: user.username, email: user.email }});
};
