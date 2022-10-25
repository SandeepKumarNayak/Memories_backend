import express,{Router} from 'express';
import auth from '../middleware/auth.js';
import { createPost,getPost,getPosts,deletePost, updatePost,likePost,getPostBySearch } from '../controller/post.js';
const router = Router();

router.get('/',getPosts);
router.get('/:id',getPost);
router.get('/getpostbyquery',getPostBySearch);


router.post('/createpost',auth,createPost);
router.delete('/:id',auth,deletePost);
router.patch('/:id',auth,updatePost);
router.patch('/:id/like',auth,likePost);

export default router;