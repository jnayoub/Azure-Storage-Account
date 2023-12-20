const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const cors = require('cors');
router.use(cors());

const generateToken = require('../endpoints/auth/generate-token');

router.post('/generateToken', generateToken);

module.exports = router;