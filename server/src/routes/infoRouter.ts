import { Response, Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { RequestWithIdAdmin, checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { remDbConDynamic } from '../database/connection.js';

const router: Router = Router();

router.use(authorizeToken);
router.use(checkAccountAccess);

router.get('/', async (req: RequestWithIdAdmin, res: Response) => {
    try {
        let properties = await remDbConDynamic('properties').select("*").where({
            accountId: req.accountId
        });
        let tenants = await remDbConDynamic('tenants').select('*').where({
            accountId: req.accountId
        });
        let leases = await remDbConDynamic('leases').select('*').where({
            accountId: req.accountId
        });
        res.json({
            properties: properties,
            tenants: tenants,
            leases: leases
        });
    } catch (err) {
        res.status(400).end();
    }
});


export {router as infoRouter};


