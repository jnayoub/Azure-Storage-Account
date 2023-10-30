const express = require('express');
const router = express.Router();
const uploadFile = require('../endpoints/uploadFile');
const listFiles = require('../endpoints/listFiles');
const downloadFile = require('../endpoints/downloadFile');

router.post('/upload', uploadFile);
router.get('/list-files', listFiles);
router.get('/download/:filename', downloadFile);

module.exports = router;
