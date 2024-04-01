let propertyErr = (err, req, res, next) => {
    if (res.headersSent) {
        console.log(err);
        next(err);
    }
    else {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};
export { propertyErr };
//# sourceMappingURL=property.err.js.map