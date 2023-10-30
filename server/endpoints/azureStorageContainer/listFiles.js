const blobServiceClient = require('../../connections/azureStorageAccount');
const containerName = 'storage-container-1';

async function listFiles(req, res) {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const listBlobsResponse = containerClient.listBlobsFlat();

        const blobs = [];
        for await (const blob of listBlobsResponse) {
            blobs.push(blob.name);
        }

        res.json(blobs);
    } catch (error) {
        res.status(500).send('Error listing files: ' + error.message);
    }
}

module.exports = listFiles;
