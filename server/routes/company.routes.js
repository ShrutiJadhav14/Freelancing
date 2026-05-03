const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const ctrl = require('../controllers/company.controller');

router.post('/profile', auth, role('company'), ctrl.createProfile);
router.get('/profile', auth, role('company'), ctrl.getProfile);

module.exports = router;