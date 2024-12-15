const FileMetadata = require("../models/mongodb-file-upload");

async function findFileAdmin(req, res) {
  console.log("findFileAdmin called");
  const { adminPassword, fileID } = req.body;

  try {
    if (!adminPassword || !fileID) {
      return res.status(400).json({ message: "Admin password and file ID are required." });
    }

    const fileRecord = await FileMetadata.findOne({ standardID: fileID });

    if (!fileRecord) {
      return res.status(404).json({ message: "File not found" });
    }

    if (fileRecord.adminPassword !== adminPassword) {
      return res.status(403).json({ message: "Invalid admin password." });
    }

    const isImage = fileRecord.fileType.startsWith("image/");
    const previewUrl = isImage ? fileRecord.storagePath : null;

    res.json({
      userFriendlyName: fileRecord.userFriendlyName,
      standardID: fileRecord.standardID,
      systemFileName: fileRecord.systemFileName,
      collectionName: fileRecord.collectionName,
      tags: fileRecord.tags,
      fileExtension: fileRecord.fileExtension,
      fileType: fileRecord.fileType,
      storagePath: fileRecord.storagePath,
      dateUploaded: fileRecord.dateUploaded,
      fileSize: fileRecord.fileSize,
      expiryDate: fileRecord.expiryDate,
      numberOfDownloadsAllowed: fileRecord.numberOfDownloadsAllowed,
      numberOfDownloads: fileRecord.numberOfDownloads,
      adminPassword: fileRecord.adminPassword,
      downloadPassword: fileRecord.password
    });
  } catch (error) {
    console.error("Error in findFileAdmin:", error);
    res.status(500).json({ message: "Error fetching file metadata." });
  }
}

module.exports = findFileAdmin;
