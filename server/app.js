const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require("./config/db");
const authRoutes = require('./routes/auth.routes.js');
const devRoutes = require('./routes/developer.routes.js');
const companyRoutes = require('./routes/company.routes.js');

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);

app.use('/api/developer', devRoutes);
app.use('/api/company', companyRoutes);
app.get('/', (req, res) => {
  res.send('API running...');
});

module.exports = app;