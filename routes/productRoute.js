import express from 'express';

import { createProduct, deleteProduct, getAllProductsOfAnyShop, productDetails, updateProductDetails, updateProductPictures } from "../controllers/productController.js";
import { isAuthenticate } from '../middlewares/authenticate.js';
import { isShopController } from '../middlewares/isShopController.js';

const router = express.Router();

router.post('/create', isAuthenticate , createProduct)
router.get('/:productid', isAuthenticate , productDetails)
router.get('/shop/:shopid', isAuthenticate, getAllProductsOfAnyShop)
router.patch('/update-details/:productid', isAuthenticate, isShopController, updateProductDetails)
router.patch('/update-picture/:productid', isAuthenticate, isShopController, updateProductPictures)
router.delete('/delete/:productid', isAuthenticate,isShopController, deleteProduct)


export default router