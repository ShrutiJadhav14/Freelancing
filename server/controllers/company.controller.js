const Company = require('../models/company.model');

exports.createProfile = async (req, res) => {
  const profile = await Company.create({
    ...req.body,
    user_id: req.user.id,
  });
  res.json(profile);
};

exports.getProfile = async (req, res) => {
  const profile = await Company.findOne({
    where: { user_id: req.user.id },
  });
  res.json(profile);
};