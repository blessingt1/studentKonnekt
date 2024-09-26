import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    try {
        /*const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }*/

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default checkAuth;