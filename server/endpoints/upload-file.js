const multer = require("multer");
const stream = require("stream");
const crypto = require("crypto");

const azureStorageAccount = require("../connections/azureStorageAccount");
const fileUploadModel = require("../models/mongodb-file-upload");
const generateUniqueID = require("../utility-functions/generate-unique-id");

const upload = multer({ storage: multer.memoryStorage() });

async function uploadFile(req, res) {
  const containerName = "personal-public-1";
  console.log("Uploading file...");
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error processing file: " + err.message });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    try {
      const originalExtension = file.originalname.split(".").pop();
      const fileChecksum = crypto
        .createHash("sha256")
        .update(file.buffer)
        .digest("hex");

      const systemFileName = `${crypto.randomUUID()}.${originalExtension}`;
      const containerClient =
        azureStorageAccount.getContainerClient(containerName);
      const blockBlobClient =
        containerClient.getBlockBlobClient(systemFileName);

      const readableStream = new stream.Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      await blockBlobClient.uploadStream(readableStream);
      const currentDate = new Date();
      const standardID = await generateUniqueID();
      const storagePath = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${systemFileName}`;
      const adminPassword = req.body.adminPassword;
      const donwloadPassword = req.body.downloadPassword;
      let numberOfDownloadsAllowed = null;
      let expiryDate = null;
      const fileDocument = new fileUploadModel({
        userFriendlyName: req.body.userFriendlyName,
        systemFileName: systemFileName,
        collectionName: req.body.collectionName,
        fileExtension: originalExtension,
        fileType: file.mimetype,
        fileSize: file.size,
        storagePath: storagePath,
        fileChecksum: fileChecksum,
        standardID: standardID,
        dateUploaded: new Date(),
        adminPassword: adminPassword,
      });

      if (req.body.tags != "null") {
        console.log("inside tags");
        const tagsArray = req.body.tags.split(",");
        for (let i = 0; i < tagsArray.length; i++) {
          tagsArray[i] = tagsArray[i].trim();
        }
        fileDocument.tags = tagsArray;
      }

      if (req.body.password != "null") {
        console.log("inside password");
        fileDocument.password = donwloadPassword;
      }

      if (req.body.numberOfDownloadsAllowed != "null") {
        numberOfDownloadsAllowed = parseInt(req.body.numberOfDownloadsAllowed);
        console.log("inside numberOfDownloadsAllowed");
        fileDocument.numberOfDownloadsAllowed = numberOfDownloadsAllowed;
      } else {
        numberOfDownloadsAllowed = 100;
        fileDocument.numberOfDownloadsAllowed = 100;
      }
      if (req.body.expiryDays != "null") {
        console.log("inside expiryDate");
        expiryDate = new Date();
        expiryDate.setDate(
          currentDate.getDate() + parseInt(req.body.expiryDays)
        );
        fileDocument.expiryDate = expiryDate;
      } else {
        expiryDate = new Date();
        expiryDate.setDate(
          currentDate.getDate() + 30
        );
        fileDocument.expiryDate = expiryDate;
      }

      await fileDocument.save();

      res.json({
        success: true,
        fileResponse: {
          fileNameInStorage: systemFileName,
          standardID: standardID,
          storagePath: storagePath,
          downloadPassword: donwloadPassword,
          password: adminPassword,
          expiryDate: expiryDate,
          numberOfDownloadsAllowed: numberOfDownloadsAllowed,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error saving file: " + error.message,
      });
    }
  });
}

module.exports = uploadFile;
