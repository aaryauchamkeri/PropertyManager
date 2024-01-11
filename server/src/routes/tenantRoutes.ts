import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addTenant, deleteTenant, updateTenant } from '../controllers/tenant/tenantController.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { tenantErr } from '../controllers/tenant/tenant.err.js';

const router: Router = Router();

router.use(authorizeToken);
router.use(checkAccountAccess);

router.post('/add', addTenant);
router.post('/update', updateTenant);
router.post('/remove', deleteTenant);

router.use(tenantErr);

export {router as tenantRouter};

