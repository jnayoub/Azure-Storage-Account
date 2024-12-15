const express = require('express');
const router = express.Router();

const uploadFile = require('../endpoints/upload-file');
const listFiles = require('../endpoints/list-files');
const downloadFile = require('../endpoints/download-file');
const getFileMetadata = require('../endpoints/find-file');
const filesAdminFindFile = require('../endpoints/files-admin-find-file');
const filesAdminEditFile = require('../endpoints/files-admin-edit-file');

router.post('/upload', uploadFile);
router.get('/list-files', listFiles);
router.post('/download', downloadFile);
router.post('/find-file', getFileMetadata);
router.post('/file-admin/find-file', filesAdminFindFile);
router.post('/file-admin/edit-file', filesAdminEditFile);
module.exports = router;