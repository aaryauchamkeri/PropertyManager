var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { remDbConDynamic } from "../database/connection.js";
export default class ActivityService {
    constructor() {
    }
    static addActivity(message, userId, { propertyId = null, tenantId = null }, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (propertyId) {
                yield remDbConDynamic('activity').insert({
                    message,
                    userId,
                    propertyId,
                    created: new Date(),
                    accountId: accountId
                });
            }
            else if (tenantId) {
                yield remDbConDynamic('activity').insert({
                    message,
                    userId,
                    tenantId,
                    created: new Date(),
                    accountId: accountId
                });
            }
        });
    }
}
//# sourceMappingURL=ActivityService.js.map