import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addNote, addProfileImage, addTask, addTenant, completeTask, deleteTenant, getAllNotes, getAllTasks, getNotes, getTasks, updateTenant, uploadFiles, viewAllTenants, viewFiles, viewProfileImage, viewTenant } from '../controllers/tenant/tenantController.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { tenantErr } from '../controllers/tenant/tenant.err.js';
import multer from 'multer';

// This route requires the account id as well as the jwt token

const router: Router = Router();

// jwt token
router.use(authorizeToken);

// account id
router.use(checkAccountAccess);

const storage = multer.memoryStorage();
const fileUpload = multer({storage: storage});

router.post('/add', addTenant);
router.post('/update', updateTenant);
router.post('/delete/:tenantId', deleteTenant);
router.get('/view', viewTenant);
router.get('/view-all', viewAllTenants);
router.get('/files', viewFiles);
router.get('/complete-task', completeTask);
router.post('/upload', fileUpload.array('files'), uploadFiles);
router.post('/add-profile-picture', fileUpload.single('pfp'), addProfileImage);
router.post('/add-note/:tenantId', addNote);
router.post('/add-task/:tenantId', addTask);
router.get('/notes/:tenantId', getNotes);
router.get('/tasks/:tenantId', getTasks);
router.get('/all-notes', getAllNotes);
router.get('/all-tasks', getAllTasks);

router.use(tenantErr);

export {router as tenantRouter};

