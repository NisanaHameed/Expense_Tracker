import express from 'express';
import { login, signup, addTransaction, getWallet, addCategory, getCategories } from '../controller/userController.js';
import authenticate from '../middleware/authenticate.js';
import multer from '../middleware/multer.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/addTransaction',authenticate, addTransaction);
router.get('/wallet',authenticate, getWallet);
router.post('/addCategory', multer.single('image'), addCategory);
router.get('/getCategories/:type',authenticate,getCategories);

export default router;