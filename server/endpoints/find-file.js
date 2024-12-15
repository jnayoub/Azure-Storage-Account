const FileMetadata = require("../models/mongodb-file-upload");

async function getFileMetadata(req, res) {
  console.log("getFileMetadata hit");
  const fileId = req.body.id?.trim();

  try {
    const fileRecord = await FileMetadata.findOne({ standardID: fileId });
    let passwordRequired;
    let isExpired;
    let limitReached;
    if (fileRecord.expiryDate < new Date()) {
      isExpired = true;
    } else {
      isExpired = false;
    }
    if (fileRecord.numberOfDownloadsAllowed <= fileRecord.numberOfDownloads) {
      limitReached = true;
    } else {
      limitReached = false;
    }
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found" });
    }
    if (fileRecord.password != "null") {
      passwordRequired = true;
    } else {
      passwordRequired = false;
    }
    let responseData = {
      userFriendlyName: fileRecord.userFriendlyName,
      fileSize: fileRecord.fileSize,
      fileType: fileRecord.fileType,
      passwordRequired: passwordRequired,
      isExpired: isExpired,
      limitReached: limitReached,
      tags : fileRecord.tags,
      collectionName: fileRecord.collectionName,
    };
    if (!isExpired && !limitReached) {
      responseData.systemFileName = fileRecord.systemFileName
    } else {
      responseData.systemFileName = null;
    }
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching file metadata:", error);
    res.status(500).json({ message: "Error fetching file metadata" });
  }
}

module.exports = getFileMetadata;
