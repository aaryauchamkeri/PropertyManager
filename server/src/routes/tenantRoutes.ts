import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addTenant, deleteTenant, updateTenant, viewAllTenants } from '../controllers/tenant/tenantController.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { tenantErr } from '../controllers/tenant/tenant.err.js';

// This route requires the account id as well as the jwt token

const router: Router = Router();

// jwt token
router.use(authorizeToken);

// account id
router.use(checkAccountAccess);

router.post('/add', addTenant);
router.post('/update', updateTenant);
router.post('/remove', deleteTenant);
router.get('/viewAll', viewAllTenants);

router.use(tenantErr);

export {router as tenantRouter};

