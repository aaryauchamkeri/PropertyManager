var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { remDbConDynamic } from '../database/connection.js';
const router = Router();
router.use(authorizeToken);
router.use(checkAccountAccess);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let properties = yield remDbConDynamic('properties').select("*").where({
            accountId: req.accountId
        });
        let tenants = yield remDbConDynamic('tenants').select('*').where({
            accountId: req.accountId
        });
        let leases = yield remDbConDynamic('leases').select('*').where({
            accountId: req.accountId
        });
        res.json({
            properties: properties,
            tenants: tenants,
            leases: leases
        });
    }
    catch (err) {
        res.status(400).end();
    }
}));
export { router as infoRouter };
//# sourceMappingURL=infoRouter.js.map