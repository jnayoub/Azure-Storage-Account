const mongoose = require("mongoose");

const fileMetadataSchema = new mongoose.Schema({
  systemFileName: {
    type: String,
    required: true,
  },
  userFriendlyName: {
    type: String,
    required: true,
  },
  parentCollectionId: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
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
  fileChecksum: {
    type: String,
    required: false,
  },
  uploadedBy: {
    type: String,
    required: false,
  },
  dateUploaded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  additionalMetadata: {
    type: Object,
    required: false,
  },
});

const fileMetadata = mongoose.model('File-Metadata', fileMetadataSchema);

module.exports = fileMetadata;
