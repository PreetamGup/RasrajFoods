import { Router } from "express";
import paymentController from "../controller/payment.controller.js";

const router = Router();

router.post('/createOrder', paymentController.createOrder);

router.post('/verification', paymentController.verifyPayment);

router.get('/allorders', paymentController.getAllOrder);

// import paymentController from "../controller/payment.controller";


// const router = Router();

// router.post('/createOrder', paymentController.createOrder)
// router.get('/verification', paymentController.verifyPayment)

export default router;