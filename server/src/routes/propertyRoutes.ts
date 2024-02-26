// This route requires the account id as well as the jwt token

import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addImages, addNote, addProperty, addTask, deleteProperty, getNotes, getProperties, getTasks, updateProperty, viewImages, viewProperty, viewTenants } from '../controllers/property/propertyControllers.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { propertyErr } from '../controllers/property/property.err.js';
import multer from 'multer';

const router: Router = Router();

// jwt token
router.use(authorizeToken);

// account id
router.use(checkAccountAccess);

const storage = multer.memoryStorage();
const fileUpload = multer({storage: storage});

router.post('/add', addProperty);
router.get('/media', viewImages);
router.post('/images', fileUpload.array('files'), addImages);
router.post('/update', updateProperty);
router.post('/delete/:propertyId', deleteProperty);
router.get('/view', viewProperty);
router.get('/list', getProperties);
router.get('/tenants', viewTenants);
router.post('/addnote/:propertyId', addNote);
router.post('/addtask/:propertyId', addTask);
router.get('/notes/:propertyId', getNotes);
router.get('/tasks/:propertyId', getTasks);

router.use(propertyErr);

export {router as propertyRouter};


