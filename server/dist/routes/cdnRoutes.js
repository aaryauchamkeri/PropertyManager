import { Router } from 'express';
import { getFile, getTemplates, uploadTemplate } from '../controllers/cdn/cdn.js';
import { viewProfileImage } from '../controllers/tenant/tenantController.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import multer from 'multer';
// This route requires the account id as well as the jwt token
// jwt token
// account id
const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });
const router = Router();
router.get('/profilePicture', viewProfileImage);
router.get('/templates', [authorizeToken, checkAccountAccess], getTemplates);
router.post('/template', [authorizeToken, checkAccountAccess, fileUpload.single('template')], uploadTemplate);
router.get('/:name', getFile);
export { router as cdnRouter };
//# sourceMappingURL=cdnRoutes.js.map