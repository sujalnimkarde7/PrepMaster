const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

// Check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error.' });
    }
};

// Check if user is accessing their own data
const isOwner = async (req, res, next) => {
    try {
        if (req.user.userId !== req.params.userId) {
            return res.status(403).json({ message: 'Access denied. You can only access your own data.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    isOwner
}; 