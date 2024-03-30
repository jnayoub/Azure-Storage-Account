const FileMetadata = require('../../connections/database/mongo/schemas/file-metadata');

async function listFiles(req, res) {
    console.log('listFiles');
    try {
        // Extract filters from the request, if any
        const filters = {};
        if (req.query.uploadedBy) filters.uploadedBy = req.query.uploadedBy;
        if (req.query.tags) filters.tags = { $all: req.query.tags.split(',') };
        if (req.query.fileType) filters.fileType = req.query.fileType;

        // Query the MongoDB database
        const files = await FileMetadata.find(filters);
        // Transform the data as needed before sending it back to the client
        const formattedFiles = files.map(file => ({
            userFriendlyName: file.userFriendlyName,
            fileNameInStorage: file.systemFileName,
            storagePath: file.storagePath,
            fileExtension: file.fileExtension,
            fileType: file.fileType,
            uploadedBy: file.uploadedBy,
            tags: file.tags,
            dateUploaded: file.dateUploaded
        }));
        
        if (formattedFiles.length === 0) {
            res.json({
                success: false,
                result: [],
                message: 'No files found.'
            });  
        } else {
            const response = {
                success: true,
                result: formattedFiles,
                message: 'Files retrieved successfully.'
            };
            res.json(response);
        }
    } catch (error) {
        logger.error({
            message: 'Error in listFiles',
            errorDetails: error.message
        });
        res.status(500).send('Error listing files: ' + error.message);
    }
}

module.exports = listFiles;
