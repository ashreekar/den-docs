import { Router } from 'express';
import { verifyUser } from "../middleware/verifyUser.js";
import { getAllPosts, getSinglePost, postApost } from "../controller/Post.controller.js";

const router = Router();

router.route('/').get(getAllPosts).post(verifyUser, postApost);

router.route('/:id').get(verifyUser, getSinglePost);

export default router;