import { Router } from "express";
import productMethods from '../controller/product.controller.js'


const router = Router();

router.get('/allproducts', productMethods.getAllProducts);
router.post('/addproduct', productMethods.addProduct);
router.patch('/editproduct/:id', productMethods.editProduct);
router.delete('/deleteproduct/:id', productMethods.deleteProduct);
router.get('/pdata/:id', productMethods.getProductById)

export default router