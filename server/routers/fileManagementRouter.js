const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const uploadFile = require('../endpoints/azureStorageContainer/uploadFile');
const listFiles = require('../endpoints/azureStorageContainer/listFiles');
const downloadFile = require('../endpoints/azureStorageContainer/downloadFile');

router.post('/upload', checkAuth, uploadFile);
router.get('/list-files', checkAuth, listFiles);
router.get('/download/:filename', checkAuth, downloadFile);

module.exports = router;
