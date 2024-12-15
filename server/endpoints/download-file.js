const blobServiceClient = require("../connections/azureStorageAccount");
const FileMetadata = require("../models/mongodb-file-upload");

async function downloadFile(req, res) {
  const fileName = req.body.fileName;
  const downloadPassword = req.body.downloadPassword;
  console.log(downloadPassword)
  try {
    const fileRecord = await FileMetadata.findOne({ systemFileName: fileName });
    if (!fileRecord) {
      return res.status(404).send("File not found in the database");
    }
    if (fileRecord.password != "null" && fileRecord.password != downloadPassword) {
      return res.status(403).send("Wrong download password");
    }
    if (fileRecord.numberOfDownloadsAllowed <= fileRecord.numberOfDownloads) {
      return res.status(403).send("Download limit reached");
    }
    const url = new URL(fileRecord.storagePath);
    const blobName = url.pathname.split("/").pop();
    const containerName = url.pathname.split("/")[1];
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    res.setHeader("Content-Type", fileRecord.fileType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(
        fileRecord.userFriendlyName
      )}"`
    );

   const downloadBlockBlobResponse = await blockBlobClient.download(0);
   downloadBlockBlobResponse.readableStreamBody.pipe(res);

    await FileMetadata.updateOne(
      { systemFileName: fileName },
      { $inc: { numberOfDownloads: 1 } }
    );
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Error downloading file");
  }
}

module.exports = downloadFile;
