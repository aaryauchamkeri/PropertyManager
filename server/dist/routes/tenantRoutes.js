import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addNote, addProfileImage, addTask, addTenant, completeTask, deleteTenant, getAllNotes, getAllTasks, getNotes, getTasks, updateTenant, uploadFiles, viewAllTenants, viewFiles, viewTenant } from '../controllers/tenant/tenantController.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { tenantErr } from '../controllers/tenant/tenant.err.js';
import multer from 'multer';
// This route requires the account id as well as the jwt token
const router = Router();
// jwt token
router.use(authorizeToken);
// account id
router.use(checkAccountAccess);
const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });
router.post('/add', addTenant);
router.post('/update', updateTenant);
router.post('/delete/:tenantId', deleteTenant);
router.get('/view', viewTenant);
router.get('/viewAll', viewAllTenants);
router.get('/files', viewFiles);
router.get('/completeTask', completeTask);
router.post('/upload', fileUpload.array('files'), uploadFiles);
router.post('/addProfilePicture', fileUpload.single('pfp'), addProfileImage);
router.post('/addnote/:tenantId', addNote);
router.post('/addtask/:tenantId', addTask);
router.get('/notes/:tenantId', getNotes);
router.get('/tasks/:tenantId', getTasks);
router.get('/allnotes', getAllNotes);
router.get('/alltasks', getAllTasks);
router.use(tenantErr);
export { router as tenantRouter };
//# sourceMappingURL=tenantRoutes.js.map