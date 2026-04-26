const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const ctrl = require('../controllers/developer.controller');

router.post('/profile', auth, role('developer'), ctrl.createProfile);
router.get('/profile', auth, role('developer'), ctrl.getProfile);

module.exports = router;