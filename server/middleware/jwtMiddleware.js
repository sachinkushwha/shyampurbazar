const jwt = require('jsonwebtoken');

exports.jwtauth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized user , login kar le bhai pahle" });
    }
    try {
        const decode = jwt.verify(token, process.env.jwt_SECRET);
        req.user = decode;
        next();
    }catch(err){
        return res.status(401).json({message:"something is worng"});
    }
    
}