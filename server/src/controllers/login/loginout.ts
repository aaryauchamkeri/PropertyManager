import { Request, Response } from "express";
import getCollection from "../../database/getCollection.js"
import { signAuth, signRefresh } from "../../middleware/authentication/jwtMiddleware.js";
import { Collection, InferIdType, ObjectId, WithId } from "mongodb";
import { saveRefreshToken } from "../../database/saveRefreshToken.js";

let users: Collection = getCollection('users');

let login = async (req: Request, res: Response, next: any) => {
    const {username, password} = req.body;
    console.log(req.headers.cookie);
    console.log(req.body);
    if(username && password) {
        let result = await users.findOne({username: username});
        if(result.password == password) {
            const email = result.email;
            const refreshToken = signRefresh({username, email});
            res.status(200).json({
                "auth_token": signAuth({username, email}),
                "refresh_token": refreshToken,
                "username": username,
                "email": email
            });
            saveRefreshToken(refreshToken);
        } else {
            console.log(result);
            res.status(401).json({message: "Invalid username or password"});
        }
    } else {
        res.status(401).json({message: "Invalid username or password"});
    }
}

let logout = (req: Request, res: Response, next: any) => {

}

export {login};