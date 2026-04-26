const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Company = sequelize.define('Company', {
  company_name: DataTypes.STRING,
  description: DataTypes.TEXT,
});

Company.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Company;