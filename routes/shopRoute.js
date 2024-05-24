import express from 'express';
import { createShop, deleteShop, editShopDetails, editShopImage, getAllShops, getShopDetails, postShopReview } from "../controllers/shopController.js";
import { isAuthenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', getAllShops)
router.post('/create', isAuthenticate, createShop)
router.get('/:shopid', getShopDetails)
router.patch('/:shopid',isAuthenticate, editShopDetails)
router.delete('/:shopid', deleteShop)
router.patch('/logo/:shopid', editShopImage)

router.post('/review/:shopId' , isAuthenticate , postShopReview)


export default router