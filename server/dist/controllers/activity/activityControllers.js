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
let getAllActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let activity = yield remDbConDynamic('activity')
            .innerJoin('users', 'users.id', '=', 'activity.userId')
            .where({
            accountId: req.accountId
        });
        res.json(activity);
    }
    catch (err) {
        res.status(400).end();
    }
});
let getActivityByTenant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let activity = yield remDbConDynamic('activity')
            .innerJoin('users', 'users.id', '=', 'activity.userId')
            .where({
            tenantId: req.query.tenantId,
            accountId: req.accountId
        });
        res.json(activity);
    }
    catch (err) {
        console.log(err);
        res.status(400).end();
    }
});
let getActivityByProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let activity = yield remDbConDynamic('activity')
            .innerJoin('users', 'users.id', '=', 'activity.userId')
            .where({
            propertyId: req.query.propertyId,
            accountId: req.accountId
        });
        res.json(activity);
    }
    catch (err) {
        console.log(err);
        res.status(400).end();
    }
});
export { getAllActivity, getActivityByTenant, getActivityByProperty };
//# sourceMappingURL=activityControllers.js.map