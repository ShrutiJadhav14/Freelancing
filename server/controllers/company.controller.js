const { Company } = require("../models");

// ✅ Get profile
exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: { userId: req.user.id },
    });

    if (!company) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(company);
  } catch (err) {
    console.log(err); 
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Create / Update
exports.upsertCompanyProfile = async (req, res) => {
  try {
    let company = await Company.findOne({
      where: { userId: req.user.id },
    });

    if (company) {
      await company.update(req.body);
    } else {
      company = await Company.create({
        ...req.body,
        userId: req.user.id,
      });
    }

    res.json(company);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};