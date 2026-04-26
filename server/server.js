const app = require('./app');
const sequelize = require('./config/db');

const PORT = 5000;

sequelize.sync() // 👈 THIS CREATES TABLES
  .then(() => {
    console.log("Database connected & tables created");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));