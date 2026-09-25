export const errorHandler = (err, req, res, next) => {
    console.error(err);

    switch (err.code) {
        case 'P2002':
            return res.status(409).json({ message: 'Resource already exist' });
        case 'P2003':
            return res.status(400).json({ message: 'Invalid relation' });
        case 'P2025':
            return res.status(404).json({ message: 'Resource not found' });
        default:
            return res.status(500).json({ message: 'Internal Server Error' });
    }
};
