const multer = require('multer');
const stream = require('stream');
const blobServiceClient = require('../../connections/azureStorageAccount');

const upload = multer({ storage: multer.memoryStorage() });
const containerName = 'storage-container-1';

async function uploadFile(req, res) {
    const fileMiddleware = upload.single('file');
    fileMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(500).send('Error processing file: ' + err.message);
        }

        const blobName = req.file.originalname;
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const readableStream = new stream.Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);

        await blockBlobClient.uploadStream(readableStream);

        res.json({
            success: true,
            result: {
                blobName: blobName,
                blobUrl: `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${blobName}`
            },
            message: 'File uploaded successfully.',
            redirect: '/'
        });
    });
}

module.exports = uploadFile;
