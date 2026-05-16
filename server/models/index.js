const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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