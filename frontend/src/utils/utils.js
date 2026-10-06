export const setServerFormErrors = (errors, setError) => {
    for (const field in errors) {
        const messages = errors[field];
        setError(field, {
            type: 'server',
            message: messages.join(', '),
        });
    }
};
