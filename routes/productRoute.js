import express from 'express';

import { createProduct, deleteProduct, getAllProductsOfAnyShop, productDetails, updateProductDetails, updateProductPictures } from "../controllers/productController.js";
import { isAuthenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/create', isAuthenticate , createProduct)
router.get('/:productid', isAuthenticate , productDetails)
router.get('/shop/:shopid', isAuthenticate, getAllProductsOfAnyShop)
router.patch('/update-details/:productid', isAuthenticate, updateProductDetails)
router.patch('/update-picture/:productid', isAuthenticate, updateProductPictures)
router.delete('/delete/:productid', isAuthenticate, deleteProduct)


export default router