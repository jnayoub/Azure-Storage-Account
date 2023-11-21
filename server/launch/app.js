const express = require('express');
const authRouter = require('../routers/authRouter');
const fileManagementRouter = require('../routers/fileManagementRouter');
const clientRouter = require('../routers/clientRouter');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const protocol = process.env.PROTOCOL || 'http';
const cookieParser = require('cookie-parser');

const ReferenceTable = require('../connections/database/mongo/schemas/referenceTable-schema');

const app = express();
const mongoosedbCon = require("../connections/database/mongo/mongodb-connection");

app.get('/mongodbreft', async (req, res) => {
   const key = req.query.key;
console.log(req.query.key)
   if (!key) {
       return res.status(400).json({ error: 'Key is required.' });
   }

   try {
       const record = await ReferenceTable.findOne({ key: key });

       if (!record) {
           return res.status(404).json({ error: 'Record not found.' });
       }

       return res.json(record.data);
   } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal Server Error.' });
   }
});



app.use(cookieParser());

app.use('/api', fileManagementRouter);
app.use('/auth', authRouter);
app.use('/', clientRouter);

app.listen(port, () => {
   console.log(`Server started on ${protocol}://${host}:${port}`);
});
