export default function handleErr(err, req, res, next) {
    if (res.headersSent) {
        next(err);
    }
    else {
        res.status(400).json({ message: err.message });
    }
}
//# sourceMappingURL=signup.error.js.map