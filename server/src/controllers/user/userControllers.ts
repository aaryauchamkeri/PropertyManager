import { remDbConDynamic } from "../../database/connection.js";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import UserService from "../../services/UserService.js";
import { response, Response } from "express";
import { uploadTemplate } from "../cdn/cdn.js";


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

let uploadProfilePicture = async (request: RequestWithIdAdmin, response: Response, next) => {
    try {
        let fileId = await uploadTemplate(request, response);
        if(fileId != -1) {
            let res = remDbConDynamic('profile_pictures').insert({
                id: request.jwtDecoded.id,
                fileId: fileId
            });
            response.status(200).end();
        } else {
            response.status(400).end();
        }
    } catch (err) {
        response.status(401).end();
    }
}

let getProfilePicture = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let userProfilePicutreId = await remDbConDynamic('profile_pictures')
                                        .select('fileId').where({
            id: req.jwtDecoded.id
        });

        res.json({fileId: userProfilePicutreId});
    } catch (err) {
        res.status(400).end();
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

export {getUserData, uploadProfilePicture, getProfilePicture,
        removeUserFromAccount, getAllAccountUsers};