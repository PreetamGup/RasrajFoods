import { Router } from "express";
import paymentController from "../controller/payment.controller.js";

const router = Router();

router.post('/createOrder', paymentController.createOrder);

router.post('/verification', paymentController.verifyPayment);

router.get('/allorders', paymentController.getAllOrder);

export default router;