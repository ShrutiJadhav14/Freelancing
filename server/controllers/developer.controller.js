const Developer = require('../models/developer.model');

exports.createProfile = async (req, res) => {
  try {
    const profile = await Developer.create({
      ...req.body,
      user_id: req.user.id,
    });
    res.json(profile);
  } catch {
    res.status(500).json({ msg: "Error creating profile" });
  }
};

exports.getProfile = async (req, res) => {
  const profile = await Developer.findOne({
    where: { user_id: req.user.id },
  });
  res.json(profile);
};