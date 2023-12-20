const crypto = require('crypto');
const BearerToken = require('../../connections/database/mongo/schemas/bearer-token-schema')

async function generateToken(req, res) {
    console.log(req.body)
    const adminKey = req.headers['x-admin-key'];

    // Check for the correct admin key
    if (adminKey !== process.env.ADMIN_KEY) {
        res.status(401);
        res.json({ error: 'Unauthorized' });
        return;
    }

    // Extract additional info from request body
    const { authorizedUserName, authorizedUserEmail } = req.body;
    if (!authorizedUserName || !authorizedUserEmail) {
        res.status(400);
        res.json({ error: 'Missing required user information' });
        return;
    }

    // Generate a random token
    const token = crypto.randomBytes(64).toString('hex');

    // Create a new token document
    const newToken = new BearerToken({
        token,
        authorizedUserName,
        authorizedUserEmail
    });

    // Save to MongoDB
    try {
        await newToken.save();
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving token');
    }
}


module.exports = generateToken;
