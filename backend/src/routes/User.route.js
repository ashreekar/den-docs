import { Router } from 'express';
import { createUser, loginUser, logoutUser } from '../controller/User.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';
import { upload } from '../middleware/multer.midddleware.js';

const router = Router();

router.route('/signup').post(upload.single("file"),createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyUser, logoutUser);

export default router;