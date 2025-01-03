import { Router } from "express";
import productMethods from '../controller/product.controller.js'
import { authMiddlware, authorization } from "../middlewares/middleware.js";


const router = Router();

router.get('/allproducts', productMethods.getAllProducts);
router.post('/addproduct', authMiddlware, authorization ,  productMethods.addProduct);
router.patch('/editproduct/:id',authMiddlware, authorization , productMethods.editProduct);
router.delete('/deleteproduct/:id', authMiddlware, authorization , productMethods.deleteProduct);
router.get('/pdata/:id', productMethods.getProductById)

export default router