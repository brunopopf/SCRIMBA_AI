export const requireBody = (req, res, next) => {
    const isBodyEmpty = !req.body || Object.keys(req.body).length === 0;

    if (isBodyEmpty) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body cannot be empty."
        });
    }
    next();
};