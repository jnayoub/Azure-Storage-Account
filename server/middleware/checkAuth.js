const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    console.log('check auth middleware hit');
    let token;

    // Check if token is in cookies
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } else {
        // If not in cookies, check the Authorization header
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader && bearerHeader.startsWith('Bearer ')) {
            token = bearerHeader.split(' ')[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "No token found." });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;  // Attach user information to the request
        next();  // Move to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = checkAuth;
