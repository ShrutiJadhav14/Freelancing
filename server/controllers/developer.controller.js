const Developer = require('../models/developer.model');
const User = require('../models/user.model');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, skills, experience, experienceType, github, linkedin, portfolio } = req.body;

    const photo = req.file ? req.file.path : null;

    let profile = await Developer.findOne({
      where: { user_id: req.user.id },
    });

    if (profile) {
      await profile.update({
        bio,
        skills,
        experience,
        experienceType,
        github,
        linkedin,
        portfolio,
        ...(photo && { photo }),
      });
    } else {
      profile = await Developer.create({
        bio,
        skills,
        experience,
        experienceType,
        github,
        linkedin,
        portfolio,
        photo,
        user_id: req.user.id,
      });
    }

    res.json(profile);

  } catch {
    console.error(err);
    res.status(500).json({ msg: "Error saving profile" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Developer.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: User,
          attributes: ['name', 'email'], // 👈 important for avatar initials
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(profile);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching profile" });
  }
};

exports.getAllDevelopers = async (req, res) => {
  try {
    const { search, skill, page = 1 } = req.query;

    const limit = 8;
    const offset = (page - 1) * limit;

    let whereCondition = {};

    // 🔍 SKILL FILTER
    if (skill) {
      whereCondition.skills = {
        [Op.like]: `%${skill}%`,
      };
    }

    const developers = await Developer.findAndCountAll({
      where: whereCondition,

      include: [
        {
          model: User,
          attributes: ["name", "email"],
          where: search
            ? {
              name: {
                [Op.like]: `%${search}%`,
              },
            }
            : {},
        },
      ],

      limit,
      offset,

      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: developers.count,
      currentPage: Number(page),
      totalPages: Math.ceil(developers.count / limit),
      developers: developers.rows,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching developers" });
  }
};