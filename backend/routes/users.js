const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/userController');

router.get('/me', auth, ctrl.getProfile);
router.put('/me', auth, ctrl.updateProfile);

module.exports = router;
