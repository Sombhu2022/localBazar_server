import express from 'express';
import { createShop, deleteShop, editShopDetails, editShopImage, getAllShops, getShopByCityOrProductName, getShopByShopName, getShopDetails, postShopReview } from "../controllers/shopController.js";

import { isAuthenticate } from '../middlewares/authenticate.js';
import { isShopController } from '../middlewares/isShopController.js';
import { isShopOwner } from '../middlewares/isShopOwner.js';

const router = express.Router();

router.get('/', getAllShops)
router.post('/create', isAuthenticate, isShopOwner, createShop)
router.get('/:shopid', getShopDetails)
router.patch('/:shopid',isAuthenticate, isShopController, editShopDetails)
router.delete('/:shopid', isAuthenticate , isShopController, deleteShop)
router.patch('/logo/:shopid',isAuthenticate , isShopController, editShopImage)
router.post('/review/:shopId' , isAuthenticate , postShopReview)

router.get('/search/:shopName' , isAuthenticate , getShopByShopName )
router.post('/search' , isAuthenticate , getShopByCityOrProductName)

router.post('/review/:shopId' , isAuthenticate , postShopReview)


export default router