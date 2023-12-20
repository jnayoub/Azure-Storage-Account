const mongoose = require("mongoose");

const fileManagementSchema = new mongoose.Schema({
  uniqueFileName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  collectionID: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  extension: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  blobPath: {
    type: String,
    required: true,
  },
  checksum: {
    type: String,
    required: false,
  },
  uploader: {
    type: String,
    required: false,
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  metadata: {
    type: Object,
    required: false,
  },
  downloadCount: {
    type: Number,
    required: false,
  }
});


const fileManagement = mongoose.model('file-system', fileManagementSchema);

module.exports = fileManagement;