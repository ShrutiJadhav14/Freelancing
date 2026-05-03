const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const devRoutes = require('./routes/developer.routes');
const companyRoutes = require('./routes/company.routes');
const sequelize = require("./config/db");

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);

app.use('/api/developer', devRoutes);
app.use('/api/company', companyRoutes);
app.get('/', (req, res) => {
  res.send('API running...');
});

// 🔥 THIS IS THE RIGHT PLACE
sequelize.sync({ alter: true })
  .then(() => {
    console.log("DB synced");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("DB sync error:", err);
  });
module.exports = app;