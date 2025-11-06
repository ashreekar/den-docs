import { Router } from 'express';
import { verifyUser } from "../middleware/verifyUser.js";
import { getAllPosts, getPostForUser, getSinglePost, postApost } from "../controller/Post.controller.js";
import { upload } from '../middleware/multer.midddleware.js';

const router = Router();

router.route('/').get(getAllPosts).post(verifyUser,upload.single("file"), postApost);

router.route('/user').get(verifyUser,getPostForUser);

router.route('/:id').get(verifyUser, getSinglePost);

export default router;