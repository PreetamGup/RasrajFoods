import { Router } from "express";
import paymentController from "../controller/payment.controller.js";
import { authMiddlware, authorization } from "../middlewares/middleware.js";

const router = Router();

router.post('/createOrder',authMiddlware, paymentController.createOrder);

router.post('/verification', paymentController.verifyPayment);

router.get('/allorders',authMiddlware, authorization, paymentController.getAllOrder);

export default router;