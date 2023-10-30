const blobServiceClient = require('../connections/azureStorageAccount');
const containerName = 'storage-container-1';

async function downloadFile(req, res) {
    const blobName = req.params.filename;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const downloadBlockBlobResponse = await blockBlobClient.download(0);

    downloadBlockBlobResponse.readableStreamBody.pipe(res);
}

module.exports = downloadFile;
