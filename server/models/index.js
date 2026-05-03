const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ✅ Models
db.User = require("./user.model");
db.Company = require("./company.model")(sequelize, DataTypes);
db.Developer = require("./developer.model");

// ✅ Associations (VERY IMPORTANT)
db.User.hasOne(db.Company, { foreignKey: "userId" });
db.Company.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;