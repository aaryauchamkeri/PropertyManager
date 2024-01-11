import { Response } from "express";
import { ExtendedRequest, signAuth } from "../../middleware/authentication/jwtMiddleware.js";
import { hasRefreshToken } from "../../database/saveRefreshToken.js";
import jwt from 'jsonwebtoken';
import UserService from "../../services/UserService.js";
import { getAssociatedAccounts } from "../login/loginout.js";

const refreshSecret = "7e7d4238ae1decda2bcd6b4ff7cd26755557ca937dec1f07cf0796790c76ff22f7b895015067d1ed055d9030e3fe6c001026346d89cb0b85e8d84a05b8853f2e";

let refresh = async (req: ExtendedRequest, res: Response, next: any) => {
    let refreshToken = req.query.refreshToken;
    if (!refreshToken){
        res.status(400).json(
            {
                "error": "no body provided"
            }
        )
    } else {
        const validToken = await hasRefreshToken(refreshToken.toString());
        if(validToken) {
            jwt.verify(refreshToken.toString(), refreshSecret, async (err, decoded: any) => {
                const userId = decoded.id;
                const userService = new UserService(userId);
                const userData = await userService.getUserData();
                const accounts = await getAssociatedAccounts(userId);
                console.log(userData);
                res.status(200)
                .json(
                    {
                        newToken: signAuth({id: decoded.id, username: decoded.username}),
                        accounts: accounts,
                        userData: userData
                    });
            });
        } else {
            return res.status(401).send({ auth: false, message: 'Invalid refresh token.' });
        }
    }
}

export {refresh};