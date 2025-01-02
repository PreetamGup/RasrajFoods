import { Router } from "express";
import userMethods from '../controller/user.controller.js'


const router = Router();

router.post('/login',userMethods.login);
router.post('/register',userMethods.register);
router.post('/logout',userMethods.logout);

router.get('/allUser', userMethods.getAllUsers);
router.post('/adduser', userMethods.addUser);
router.patch('/edituser', userMethods.editUser);
router.get('/userdata/:id', userMethods.getUserById)
router.post('/generateOtp', userMethods.generateOtp);
router.post('/verifyOtp', userMethods.verifyOtp);

export default router