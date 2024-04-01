import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import UserService from "../../services/UserService.js";
import { Response } from "express";


let getUserData = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const userId = String(req.query.id);
        let userService = new UserService();
        let userData = await userService.getUserData(userId);
        delete userData.id;
        delete userData.password;
        res.json(userData);
    } catch(err) {
        res.end(401);
    }
}

let removeUserFromAccount = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const isAdmin = req.isAdmin;
        const idToRemove = req.query.userId;
        if(isAdmin) {
            let userService = new UserService();
            await userService.removeUserFromAccount(String(idToRemove), req.accountId);
            res.status(200).end();
        } else {
            res.status(401).json({
                message: 'you are not an admin'
            });
        }
    } catch(err) {
        res.status(400).end();
    }
}

let getAllAccountUsers = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const userId = req.jwtDecoded.id;
        const accountId = req.accountId;
        let userService = new UserService();
        let users = await userService.getAllUsers(accountId);
        res.json(users);
    } catch(err) {
        console.log(err);
        res.status(401).end();
        // next(err);
    }
}

export {getUserData, removeUserFromAccount, getAllAccountUsers};