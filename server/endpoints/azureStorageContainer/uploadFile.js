const multer = require("multer");
const stream = require("stream");
const crypto = require("crypto");
const blobServiceClient = require("../../connections/azureStorageAccount");
const FileMetadata = require("../../connections/database/mongo/schemas/file-metadata");

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
    const fileChecksum = hash.digest("hex");
    // Generate a unique filename
    const originalExtension = req.file.originalname.split(".").pop();
    const systemFileName = crypto.randomUUID() + "." + originalExtension;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(systemFileName);

    const readableStream = new stream.Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    try {
      await blockBlobClient.uploadStream(readableStream);
      // Extract file metadata
      const storagePath = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${systemFileName}`;
      let additionalMetadata = {};
      try {
        if (req.body.metadata) {
          additionalMetadata = JSON.parse(req.body.metadata);
        }
      } catch (parseError) {
        return res.status(400).send("Invalid metadata format");
      }

      // Create a new document
      const fileDocument = new FileMetadata({
        systemFileName: systemFileName,
        userFriendlyName: req.body.userFriendlyName,
        parentCollectionId: req.body.parentCollectionId,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
        fileExtension: originalExtension,
        fileType: req.file.mimetype,
        storagePath: storagePath,
        fileChecksum: fileChecksum,
        uploadedBy: req.body.uploadedBy,
        dateUploaded: new Date(),
        additionalMetadata: additionalMetadata,
      });

      // Save the document to MongoDB
      await fileDocument.save();

      // Send response
      res.json({
        success: true,
        result: {
          fileNameInStorage: systemFileName,
          storagePath: storagePath,
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
