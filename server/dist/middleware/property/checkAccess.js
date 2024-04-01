import { remDbCon } from "../../database/connection.js";
const checkAccessToAccount = (req, res, next) => {
    const body = req.body;
    const userInfo = req.jwtDecoded;
    const accountId = body.accountId;
    if (!body) {
        next();
    }
    else if (!accountId) {
        res.status(400).json({ message: 'No account id provided' });
    }
    else {
        remDbCon.query('SELECT * FROM account_users WHERE accountId = ? AND userId = ?', [accountId, userInfo.id], (err, results) => {
            if (err) {
                console.log(err.code);
                res.status(400).end();
            }
            else if (results.length > 0) {
                next();
            }
        });
    }
};
export { checkAccessToAccount };
//# sourceMappingURL=checkAccess.js.map