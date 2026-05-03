const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {}

  Company.init(
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      website: DataTypes.STRING,
      location: DataTypes.STRING,
      industry: DataTypes.STRING,
      companySize: DataTypes.STRING,
      foundedYear: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "Companies",
    }
  );

  console.log("✅ Company model registered");

  return Company;
};