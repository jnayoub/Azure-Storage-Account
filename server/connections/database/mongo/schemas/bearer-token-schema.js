const mongoose = require('mongoose');
const bearerTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    authorizedUserName: {
        type: String,
        required: true
    },
    authorizedUserEmail: {
        type: String,
        required: true
    },
});

const BearerToken = mongoose.model('bearer-token', bearerTokenSchema);

module.exports = BearerToken;
