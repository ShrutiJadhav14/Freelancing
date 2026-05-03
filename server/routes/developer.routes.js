const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const ctrl = require('../controllers/developer.controller');
const upload = require('../middleware/upload');

router.get('/profile', auth, role('developer'), ctrl.getProfile);

router.post(
  '/profile',
  auth,
  role('developer'),
  upload.single('photo'), 
  ctrl.createOrUpdateProfile
);

module.exports = router;