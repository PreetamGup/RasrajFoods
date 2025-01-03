import { Router } from "express";
import adminController  from "../controller/admin.controller.js";

const router = new Router();

router.get('/dashboard', adminController.adminDashboard);

export default router;
