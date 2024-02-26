import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import UserService from "../../services/UserService.js";
import { Response } from "express";


let getUserData = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const userId = String(req.query.id);
        let userService = new UserService();
        let userData = await userService.getUserData(userId);
        res.json(userData);
    } catch(err) {
        next(err);
    }
}

export {getUserData};