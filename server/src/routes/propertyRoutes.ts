// This route requires the account id as well as the jwt token

import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addFiles, addNote, addProperty, addTask, completeTask, deleteProperty, getAllNotes, 
    getAllTasks, getNotes, getProperties, getTasks, updateProperty, viewFiles, viewImages, 
    viewProperty, viewTenants, } 
    from '../controllers/property/propertyControllers.js';
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
router.get('/files', viewFiles);
router.get('/complete-task', completeTask);
router.post('/add-files', fileUpload.array('files'), addFiles);
router.post('/update', updateProperty);
router.post('/delete/:propertyId', deleteProperty);
router.get('/view', viewProperty);
router.get('/list', getProperties);
router.get('/tenants', viewTenants);
router.post('/add-note/:propertyId', addNote);
router.post('/add-task/:propertyId', addTask);
router.get('/notes/:propertyId', getNotes);
router.get('/tasks/:propertyId', getTasks);
router.get('/all-notes', getAllNotes);
router.get('/all-tasks', getAllTasks);

router.use(propertyErr);

export {router as propertyRouter};


