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
let refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const username = req.body.username;
    const email = req.body.email;
    if (!body) {
        res.status(400).json({
            "error": "no body provided"
        });
    }
    else {
        let refreshToken = body.refreshToken;
        const validToken = yield hasRefreshToken(refreshToken);
        if (validToken) {
            return signAuth({ username: username, email: email });
        }
        else {
            return res.status(401).send({ auth: false, message: 'Invalid refresh token.' });
        }
    }
});
let verify = () => {
};
//# sourceMappingURL=jwtVerification.js.map