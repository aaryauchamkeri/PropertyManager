import { Request, Response } from "express";
import { signAuth, signRefresh } from "../../middleware/authentication/jwtMiddleware.js";
import { deleteRefreshToken, saveRefreshToken } from "../../database/saveRefreshToken.js";
import { remDbCon, remDbConDynamic } from "../../database/connection.js";


async function getAssociatedAccounts(id: number) {
    return await remDbConDynamic('account_users')
        .select('*')
        .innerJoin('accounts', 'account_users.accountId', '=', 'accounts.id')
        .where({
            userId: id
        });
}

let login = async (req: Request, res: Response, next: any) => {
    const {username, password} = req.body;
    if(username && password) {
        try {
            let results = await remDbConDynamic('users').select('*').where({
                username: username,
                password: password
            });
            if(results.length >= 1) {
                const userData = {
                    id: results[0].id,
                    username: username
                };
                let accounts = await getAssociatedAccounts(userData.id);
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
            } else {
                res.status(401).json({message: 'Invalid username or password'});
            }
        } catch(err) {
            console.log(err);
            res.status(400).end();
        }
    } else {
        res.status(401).json({message: "Invalid username or password"});
    }
}

let logout = (req: Request, res: Response, next: any) => {
    const {refreshToken} = req.body;
    if(!refreshToken) {
        res.status(400).json({
            message: 'No refresh token provided'
        });
    } else {
        deleteRefreshToken(refreshToken);
        res.status(200).end();
    }
}

export {login, logout, getAssociatedAccounts};