var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signAuth, signRefresh } from "../../middleware/authentication/jwtMiddleware.js";
import { deleteRefreshToken, saveRefreshToken } from "../../database/saveRefreshToken.js";
import { remDbConDynamic } from "../../database/connection.js";
function getAssociatedAccounts(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remDbConDynamic('account_users')
            .select('*')
            .innerJoin('accounts', 'account_users.accountId', '=', 'accounts.id')
            .where({
            userId: id
        });
    });
}
let login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username && password) {
        try {
            let results = yield remDbConDynamic('users').select('*').where({
                username: username,
                password: password
            });
            if (results.length >= 1) {
                const userData = {
                    id: results[0].id,
                    username: username
                };
                let accounts = yield getAssociatedAccounts(userData.id);
                const authToken = signAuth(userData);
                const refreshToken = signRefresh(userData);
                saveRefreshToken(refreshToken);
                res.status(200).json({
                    auth: authToken,
                    refresh: refreshToken,
                    accounts: accounts,
                    id: results[0].id,
                    isAdmin: results[0].isAdmin,
                    firstName: results[0].first_name,
                    lastName: results[0].last_name,
                    username: results[0].username,
                    email: results[0].email
                });
            }
            else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).end();
        }
    }
    else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});
let logout = (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(400).json({
            message: 'No refresh token provided'
        });
    }
    else {
        deleteRefreshToken(refreshToken);
        res.status(200).end();
    }
};
export { login, logout, getAssociatedAccounts };
//# sourceMappingURL=loginout.js.map