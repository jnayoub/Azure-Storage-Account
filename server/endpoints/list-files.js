const FileMetadata = require("../models/mongodb-file-upload");

async function listFiles(req, res) {
  try {
    const filters = {};

    const searchBy = req.query.searchby;
    const searchValue = req.query.value;
    if (searchBy && searchValue) {
      console.log("searchBy:", searchBy);
      console.log("searchValue:", searchValue);

      if (searchBy === "filename") {
        filters.userFriendlyName = { $regex: searchValue, $options: "i" };
        console.log(
          "Applied userFriendlyName filter:",
          filters.userFriendlyName
        );
      } else if (searchBy === "tags") {
        filters.tags = { $regex: searchValue, $options: "i" };
      } else if (searchBy === "collection") {
        filters.collectionName = { $regex: searchValue, $options: "i" };
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const files = await FileMetadata.find(filters).skip(skip).limit(limit);
    const totalDocuments = await FileMetadata.countDocuments(filters);
    const totalPages = Math.ceil(totalDocuments / limit);
    const formattedFiles = files.map((file) => ({
      userFriendlyName: file.userFriendlyName,
      collectionName: file.collectionName,
      fileNameInStorage: file.systemFileName,
      storagePath: file.storagePath,
      fileExtension: file.fileExtension,
      fileType: file.fileType,
      fileSize: file.fileSize,
      uploadedBy: file.uploadedBy,
      standardID: file.standardID,
      tags: file.tags,
      dateUploaded: file.dateUploaded,
    }));

    res.json({
      success: true,
      result: formattedFiles,
      page: page,
      totalPages: totalPages,
      totalResults: totalDocuments,
      message: "Files retrieved successfully.",
    });
  } catch (error) {
    console.error({
      message: "Error in listFiles",
      errorDetails: error.message,
    });
    res.status(500).send("Error listing files: " + error.message);
  }
}

module.exports = listFiles;
