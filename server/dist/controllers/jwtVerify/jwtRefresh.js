var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signAuth } from "../../middleware/authentication/jwtMiddleware.js";
import { hasRefreshToken } from "../../database/saveRefreshToken.js";
import jwt from 'jsonwebtoken';
import UserService from "../../services/UserService.js";
import { getAssociatedAccounts } from "../login/loginout.js";
const refreshSecret = "7e7d4238ae1decda2bcd6b4ff7cd26755557ca937dec1f07cf0796790c76ff22f7b895015067d1ed055d9030e3fe6c001026346d89cb0b85e8d84a05b8853f2e";
let refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let refreshToken = req.query.refreshToken;
    if (!refreshToken) {
        res.status(400).json({
            "error": "no body provided"
        });
    }
    else {
        const validToken = yield hasRefreshToken(refreshToken.toString());
        if (validToken) {
            jwt.verify(refreshToken.toString(), refreshSecret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const userId = decoded.id;
                    const userService = new UserService();
                    const userData = yield userService.getUserData(userId);
                    const accounts = yield getAssociatedAccounts(userId);
                    delete userData.password;
                    res.status(200)
                        .json(Object.assign({ auth: signAuth({ id: decoded.id, username: decoded.username }), accounts: accounts }, userData));
                }
                catch (err) {
                    res.status(400).end();
                }
            }));
        }
        else {
            return res.status(401).send({ auth: false, message: 'Invalid refresh token.' });
        }
    }
});
export { refresh };
//# sourceMappingURL=jwtRefresh.js.map