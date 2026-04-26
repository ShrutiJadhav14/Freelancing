const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');
router.post('/register', register); // ✅ FIXED
router.post('/login', login);

module.exports = router;