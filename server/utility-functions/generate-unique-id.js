const fileUploadModel = require("../models/mongodb-file-upload");
const generateRandomID = require("./generate-random-id");

async function generateUniqueID() {
  let isUnique = false;
  let randomID;

  while (!isUnique) {
    randomID = generateRandomID(7);
    const existingFile = await fileUploadModel.findOne({
      standardID: randomID,
    });
    if (!existingFile) {
      isUnique = true;
    }
  }

  return randomID;
}

module.exports = generateUniqueID;
