let tenantErr = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    }
    else {
        res.status(400).json(err);
    }
};
export { tenantErr };
//# sourceMappingURL=tenant.err.js.map