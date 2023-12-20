const FileManagement = require('../../connections/database/mongo/schemas/file-management-schema');
const logger = require('../../middleware/logger');


async function listFiles(req, res) {
    logger.info({
        message: 'Received listFiles request',
        requestDetails: {
            url: req.originalUrl || req.url,
            method: req.method,
            queryParams: req.query
        }
    });
        try {
        // Extract filters from the request, if any
        // Assuming filters are passed as query parameters
        const filters = {};
        if (req.query.uploader) filters.uploader = req.query.uploader;
        if (req.query.tags) filters.tags = { $all: req.query.tags.split(',') };
        if (req.query.type) filters.type = req.query.type;

        // Query the MongoDB database
        const files = await FileManagement.find(filters);
        logger.info({
            message: 'Database data fetched',
            databaseData: files // Be cautious with sensitive data
        });
        // Transform the data as needed before sending it back to the client
        const formattedFiles = [];
        
        for (let i = 0; i < files.length; i++) {
            const fileObject = {
                displayName: files[i].displayName + '.' + files[i].extension,
                fileNameinStorageContainer: files[i].uniqueFileName,
                originalFileName: files[i].originalFileName,
                blobPath: files[i].blobPath,
                extension: files[i].extension,
                type: files[i].type,
                uploader: files[i].uploader,
                tags: files[i].tags,
                uploadDate: files[i].uploadDate
            }
            formattedFiles.push(fileObject);
        }
        if (formattedFiles.length === 0) {
            const response = {
                success: false,
                result: [],
                message: 'No files found.'
            };
            logger.info({
                message: 'Sending listFiles response',
                responseData: response
            });
            res.json(response);  
        } else {
            const response = {
                success: true,
                result: formattedFiles,
                message: 'Files retrieved successfully.'
            };
            res.json(response);
            console.log("listFiles complete. Logging to logger.");
            //logger.info("listFiles complete.");
            logger.info({
                message: 'listFiles complete. Sending response.',
                data: response,
            });
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
