const blobServiceClient = require('../../connections/azureStorageAccount');
const containerName = 'storage-container-1';
const fileManagement = require('../../connections/database/mongo/schemas/file-management-schema');

async function downloadFile(req, res) {
    // Extract displayName from request parameters
    const displayName = req.params.filename;

    try {
        // Query MongoDB for the file with the given displayName
        const fileRecord = await fileManagement.findOne({ displayName: displayName });
        if (!fileRecord) {
            return res.status(404).send('File not found in the database');
        }
        // Extract blobName from the fileRecord
        const url = new URL(fileRecord.blobPath);
        const blobName = url.pathname.split('/').pop();
        // Get the block blob client
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        //Set Headers
        res.setHeader('Content-Type', fileRecord.type);
        // Download the blob
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        downloadBlockBlobResponse.readableStreamBody.pipe(res);
        
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Error downloading file');
    }
}

module.exports = downloadFile;
