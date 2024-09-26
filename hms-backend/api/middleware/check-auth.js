import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    try {
        // Check if the Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        console.log("Token: ", token); // Log the token for debugging

        const decoded = jwt.verify(token, process.env.JWT_KEY); // Ensure JWT_KEY is set in .env
        req.user = decoded; // Attach decoded user info to req.user

        console.log("Decoded JWT: ", decoded); // Log the decoded token
        next();
    } catch (error) {
        console.error("JWT Verification Error: ", error);
        return res.status(401).json({ message: "Authentication failed" });
    }
};

export default checkAuth;
