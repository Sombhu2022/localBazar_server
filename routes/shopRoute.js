import express from 'express';
import { createShop, deleteShop, editShopDetails, editShopImage, getAllShops, getShopDetails } from "../controllers/shopController.js";

const router = express.Router();

router.get('/', getAllShops)
router.post('/create', createShop)
router.get('/:shopid', getShopDetails)
router.patch('/:shopid', editShopDetails)
router.delete('/:shopid', deleteShop)
router.patch('/logo/:shopid', editShopImage)


export default router