require('dotenv').config(); 
const app = require('./app'); 
const sequelize = require('./config/db'); 
const PORT = 5000;
const db = require("./models")

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected & tables created");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
