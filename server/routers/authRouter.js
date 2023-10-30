const express = require('express');
const router = express.Router();

const getUser = require('../endpoints/auth/login');

router.use('/login', getUser);

module.exports = router;
