const blobServiceClient = require('../../connections/azureStorageAccount');
const containerName = 'storage-container-1';
const FileMetadata = require('../../connections/database/mongo/schemas/file-metadata');

async function downloadFile(req, res) {
    // Extract userFriendlyName from request parameters
    const userFriendlyName = req.params.filename;

    try {
        // Query MongoDB for the file with the given userFriendlyName
        const fileRecord = await FileMetadata.findOne({ userFriendlyName: userFriendlyName });
        if (!fileRecord) {
            return res.status(404).send('File not found in the database');
        }
        // Extract blobName from the fileRecord
        const url = new URL(fileRecord.storagePath);
        const blobName = url.pathname.split('/').pop();
        // Get the block blob client
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        // Set Headers
        res.setHeader('Content-Type', fileRecord.fileType);
        // Download the blob
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        downloadBlockBlobResponse.readableStreamBody.pipe(res);
        
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Error downloading file');
    }
}

module.exports = downloadFile;
