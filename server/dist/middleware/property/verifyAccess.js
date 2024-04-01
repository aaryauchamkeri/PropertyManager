var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { remDbConDynamic } from "../../database/connection.js";
const checkAccountAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.jwtDecoded;
    const userId = userInfo.id;
    const accountId = req.header('accountId');
    if (accountId) {
        let resultSet = yield remDbConDynamic('account_users').where({
            accountId: accountId,
            userId: userId
        });
        if (resultSet.length > 0) {
            if (resultSet[0].isAdmin) {
                req.isAdmin = true;
            }
            else {
                req.isAdmin = false;
            }
            req.accountId = accountId;
            next();
        }
        else {
            res.status(401).json({ message: 'no account id present' });
        }
    }
    else {
        res.status(400).end();
    }
});
export { checkAccountAccess };
//# sourceMappingURL=verifyAccess.js.map