const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Developer = sequelize.define('Developer', {
  bio: DataTypes.TEXT,
  skills: DataTypes.STRING,
  experience: DataTypes.INTEGER,
  github: DataTypes.STRING,
  linkedin: DataTypes.STRING,
  portfolio: DataTypes.STRING,
  phone: DataTypes.STRING,
});

Developer.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Developer;