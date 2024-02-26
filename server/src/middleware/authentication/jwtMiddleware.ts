import {config} from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

config({path: '../../.env'});

const authSecret: string = "92a795190818bfdb7013a0c1ec506092c6fdd89f6a8854272c3f933ecb22f10183d4b52889f260e9c07061939b79e81ff8c7bf86da3e5f9e64da9787c22304c2";
const refreshSecret: string = "7e7d4238ae1decda2bcd6b4ff7cd26755557ca937dec1f07cf0796790c76ff22f7b895015067d1ed055d9030e3fe6c001026346d89cb0b85e8d84a05b8853f2e";

interface JwtDecoded {
    id: string
}

interface RequestWithId extends Request {
    jwtDecoded: JwtDecoded
}

let authorizeToken = (req: RequestWithId, res: Response, next: Function) => {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], authSecret, (err: Error, decodedToken: any) => {
            if(err) {
                res.status(401).json({
                    "err" : "expired token",
                    "status" : 401
                });
            } else {
                req.jwtDecoded = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).end();
    }
}

let signAuth = (payload: object): string => {
    return jwt.sign(payload, authSecret, {expiresIn: '24hr'});
}

let signRefresh = (payload: object): string => {
    return jwt.sign(payload, refreshSecret/*, {expiresIn: '24hr'}*/);
}

export default authorizeToken;
export {signAuth, signRefresh};
export {RequestWithId};