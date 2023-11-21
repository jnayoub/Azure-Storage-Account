const mongoose = require("mongoose");

const fileManagementSchema = new mongoose.Schema({
  storedFileName: {
    type: String,
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = fileManagementSchema;
