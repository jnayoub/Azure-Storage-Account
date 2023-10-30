const express = require('express');
const fileManagementRouter = require('../routers/fileManagement');
const clientRouter = require('../client/clientRouter');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const protocol = process.env.PROTOCOL || http;

const app = express();

app.use('/api', fileManagementRouter);
app.use('/', clientRouter);

app.listen(port, () => {
   console.log(`Server started on ${protocol}://${host}:${port}`);
});
