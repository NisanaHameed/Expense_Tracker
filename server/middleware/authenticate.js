import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    console.log(req.headers)
    let token = req.headers?.authorization?.split(' ')[1]
    console.log('token....',token)
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized1' });
    }
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        console.log('decoded',decoded)
        if (decoded) {
            req.userId = decoded.Id;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized2' });
        }

    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).json({ success: false, message: 'Unauthorized3' });
    }
}

export default authenticate;