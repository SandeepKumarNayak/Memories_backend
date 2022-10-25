import express , {Router} from 'express';
import { signIn,signUp } from '../controller/user.js';


const router = Router();

router.post('/signin',signIn);
router.post('/signup',signUp);
 

export default router;