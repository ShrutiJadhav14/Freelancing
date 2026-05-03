const express = require('express');
const cors = require('cors');
const app = express();
<<<<<<< HEAD
const authRoutes = require('./routes/auth.routes');
const devRoutes = require('./routes/developer.routes');
const companyRoutes = require('./routes/company.routes');
const sequelize = require("./config/db");
=======
const authRoutes = require('./routes/auth.routes.js');
const devRoutes = require('./routes/developer.routes.js');
const companyRoutes = require('./routes/company.routes.js');

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
>>>>>>> 7842b7840910e24c8b1581f3ab803d9712c0fd1d

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