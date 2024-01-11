import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addProperty, deleteProperty, getProperties, updateProperty } from '../controllers/property/propertyControllers.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { propertyErr } from '../controllers/property/property.err.js';

const router: Router = Router();

router.use(authorizeToken);
router.use(checkAccountAccess);

router.post('/add', addProperty);
router.post('/update', updateProperty);
router.post('/delete', deleteProperty);
router.get('/list', getProperties);

router.use(propertyErr);

export {router as propertyRouter};


