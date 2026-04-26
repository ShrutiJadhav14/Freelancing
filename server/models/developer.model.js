const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Developer = sequelize.define('Developer', {
  bio: DataTypes.TEXT,
  skills: DataTypes.STRING,
  experience: DataTypes.INTEGER,
});

Developer.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Developer;