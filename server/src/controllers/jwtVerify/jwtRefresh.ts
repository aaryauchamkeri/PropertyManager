import { Response } from "express";
import { ExtendedRequest, signAuth } from "../../middleware/authentication/jwtMiddleware.js";
import { hasRefreshToken } from "../../database/saveRefreshToken.js";


let refresh = async (req: ExtendedRequest, res: Response, next: any) => {
    let refreshToken = req.query.refreshToken;
    const username = req.query.username;
    const email = req.query.email;
    if (!refreshToken || !username || !email){
        res.status(400).json(
            {
                "error": "no body provided"
            }
        )
    } else {
        const validToken = await hasRefreshToken(refreshToken.toString());
        if(validToken) {
            res.status(200)
                .json(
                    {newToken: signAuth({username: username.toString(), email: email.toString()})});
        } else {
            return res.status(401).send({ auth: false, message: 'Invalid refresh token.' });
        }
    }
}

export {refresh};