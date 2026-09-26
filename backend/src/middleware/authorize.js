export default (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User is unauthorized' });
    }

    if (req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Forbidden: Access denied' });
    }

    next();
};
