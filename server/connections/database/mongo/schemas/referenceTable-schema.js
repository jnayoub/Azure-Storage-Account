const mongoose = require("mongoose");

const referenceTableSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  created: Date,
  data: [mongoose.Schema.Types.Mixed],
});

module.exports = referenceTableSchema;