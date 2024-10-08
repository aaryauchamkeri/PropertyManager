var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { remDbConDynamic } from "../../database/connection.js";
import UserService from "../../services/UserService.js";
import { uploadTemplate } from "../cdn/cdn.js";
let getUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = String(req.query.id);
        let userService = new UserService();
        let userData = yield userService.getUserData(userId);
        delete userData.id;
        delete userData.password;
        res.json(userData);
    }
    catch (err) {
        res.end(401);
    }
});
let uploadProfilePicture = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fileId = yield uploadTemplate(request, response);
        if (fileId != -1) {
            let res = remDbConDynamic('profile_pictures').insert({
                id: request.jwtDecoded.id,
                fileId: fileId
            });
            response.status(200).end();
        }
        else {
            response.status(400).end();
        }
    }
    catch (err) {
        response.status(401).end();
    }
});
let getProfilePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userProfilePicutreId = yield remDbConDynamic('profile_pictures')
            .select('fileId').where({
            id: req.jwtDecoded.id
        });
        res.json({ fileId: userProfilePicutreId });
    }
    catch (err) {
        res.status(400).end();
    }
});
let removeUserFromAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdmin = req.isAdmin;
        const idToRemove = req.query.userId;
        if (isAdmin) {
            let userService = new UserService();
            yield userService.removeUserFromAccount(String(idToRemove), req.accountId);
            res.status(200).end();
        }
        else {
            res.status(401).json({
                message: 'you are not an admin'
            });
        }
    }
    catch (err) {
        res.status(400).end();
    }
});
let getAllAccountUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.jwtDecoded.id;
        const accountId = req.accountId;
        let userService = new UserService();
        let users = yield userService.getAllUsers(accountId);
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(401).end();
        // next(err);
    }
});
export { getUserData, uploadProfilePicture, getProfilePicture, removeUserFromAccount, getAllAccountUsers };
//# sourceMappingURL=userControllers.js.map