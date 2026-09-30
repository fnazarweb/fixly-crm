export const validate = (schema) => (req, res, next) => {
    // Check if data is valid and return data or errors
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errors = {};

        // Get errors for invalid properties
        for (const issue of result.error.issues) {
            const field = issue.path[0];

            if (!errors[field]) {
                errors[field] = [];
            }

            errors[field].push(issue.message);
        }

        // Return response with errors
        return res.status(400).json({
            message: 'Invalid data',
            errors,
        });
    }

    // Assign values transformed by zod (email to lower case)
    req.body = result.data;

    next();
};
