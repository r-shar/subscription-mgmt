import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        
        const decision = await aj.protect(req, {requested: 1}); // take 1 token from bucket for each req
        if (decision.isDenied()) {

            if (decision.reason.isRateLimit()) return res.status(429).json({error: "Too many requests. Rate limit exceeded."});
            if (decision.reason.isBot()) return res.status(403).json({error: "Bot detected"});

            return res.status(403).json({error: "Access denied"});
            
        }

        next(); // req not denied, we can proceed
    } catch (error) {
        console.log("Arcjet middleware error", error);
        next(error);
    }
}


export default arcjetMiddleware;