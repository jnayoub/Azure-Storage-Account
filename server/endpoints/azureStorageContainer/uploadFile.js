const multer = require("multer");
const stream = require("stream");
const crypto = require("crypto");
const blobServiceClient = require("../../connections/azureStorageAccount");
const FileManagement = require("../../connections/database/mongo/schemas/file-management-schema");

const upload = multer({ storage: multer.memoryStorage() });
const containerName = "storage-container-1";

async function uploadFile(req, res) {
  const fileMiddleware = upload.single("file");
  fileMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).send("Error processing file: " + err.message);
    }

    // Checksum Hash
    const hash = crypto.createHash("sha256");
    hash.update(req.file.buffer);
    const cheksum = hash.digest("hex");
    // Generate a unique filename
    const originalExtension = req.file.originalname.split(".").pop();
    const uniqueFilename = crypto.randomUUID() + "." + originalExtension;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueFilename);

    const readableStream = new stream.Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    try {
      await blockBlobClient.uploadStream(readableStream);
      // Extract file metadata
      const blobPath = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${uniqueFilename}`;
      let metadata = {};
      try {
        if (req.body.metadata) {
          metadata = JSON.parse(req.body.metadata);
        } else {
          metadata = {};
        }
        console.log(metadata);
      } catch (parseError) {
        return res.status(400).send("Invalid metadata format");
      }

      // Create a new document
      const fileDocument = new FileManagement({
        uniqueFileName: uniqueFilename,
        displayName: req.body.displayName,
        collectionID: req.body.collectionID,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
        extension: originalExtension,
        type: req.file.mimetype,
        blobPath: blobPath,
        checksum: cheksum,
        uploader: req.body.uploader,
        metadata: metadata,
        downloadCount: 0,
      });

      // Save the document to MongoDB
      await fileDocument.save();

      // Send response
      res.json({
        success: true,
        result: {
          blobName: uniqueFilename,
          blobUrl: blobPath,
        },
        message: "File uploaded and saved successfully.",
        redirect: "/",
      });
    } catch (error) {
      res.status(500).send("Error saving file: " + error.message);
    }
  });
}

module.exports = uploadFile;
