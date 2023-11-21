const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
    const token = req.cookies?.jwt;
    if (!token) {
        return res.status(401).redirect("/unauthorized");
    }   
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).redirect("/unauthorized");
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        res.status(401).redirect("/unauthorized");
    }
}

module.exports = checkAuth;
