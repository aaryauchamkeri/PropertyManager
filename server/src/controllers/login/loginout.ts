import { Request, Response } from "express";
import getCollection from "../../database/getCollection.js"
import { signAuth, signRefresh } from "../../middleware/authentication/jwtMiddleware.js";
import { Collection, InferIdType, ObjectId, WithId } from "mongodb";
import { deleteRefreshToken, saveRefreshToken } from "../../database/saveRefreshToken.js";
import { remDbCon } from "../../database/connection.js";


function getAssociatedAccounts(id: number) {
    return new Promise((resolve, reject) => {
        remDbCon.query('SELECT name, id FROM accounts INNER JOIN account_users ON accounts.id = account_users.userId WHERE userId = ?', [id], (err, results) => {
            if(err) {
                reject(err.message);
            } else {
                resolve(results);
            }
        }); 
    });
}

let login = async (req: Request, res: Response, next: any) => {
    const {username, password} = req.body;
    if(username && password) {
        remDbCon.query('SELECT password, id FROM users WHERE username = ?', [username], async (err, results) => {
            if(err) {
                console.log(err);
                res.status(400).json({message: 'An error occured'});
            } else {
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
                        accounts: accounts
                    });
                } else {
                    res.status(401).json({message: 'Invalid username or password'});
                }
            }
            res.status(200).end();
        });
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

export {login, logout};