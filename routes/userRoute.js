import express from 'express'
import { getUserProfile, logout } from '../controllers/userController.js';
import { googleSignup } from '../controllers/googleSignupController.js';
import { isAuthenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/profile', isAuthenticate, getUserProfile)
router.post('/google/signup', googleSignup)
router.get('/logout', isAuthenticate, logout)


export default router