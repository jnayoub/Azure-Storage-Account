const mongoose = require("mongoose");

const fileUplaodSchema = new mongoose.Schema({
  userFriendlyName: {
    type: String,
    required: true,
  },
  standardID: {
    type: String,
    required: true,
  },
  systemFileName: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
    default: []
  },
  fileExtension: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  storagePath: {
    type: String,
    required: true,
  },
  dateUploaded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  fileSize: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: false,
    default: null,
  },
  password: {
    type: String,
    required: false,
    default: null,
  },
  adminPassword: {
    type: String,
    required: true,
    default: null,
  },
  numberOfDownloadsAllowed: {
    type: Number,
    required: false,
    default: 0,
  },
  numberOfDownloads: {
    type: Number,
    required: false,
    default: 0,
  }
});

const fileUploadModel = mongoose.model('Azure-File-Upload', fileUplaodSchema);

module.exports = fileUploadModel;
