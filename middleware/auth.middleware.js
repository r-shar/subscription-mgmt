import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {
    try {

        let token; 
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            const error = new Error("No token provided");
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = await User.findById(decoded.userId);

        next();
        
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message
        });
        next(error);
    }
}

export default authorize;