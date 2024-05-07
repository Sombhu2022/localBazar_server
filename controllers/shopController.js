import { Shop } from "../models/shopModel.js";
import { User } from "../models/userModel.js"

export const createShop = async (req, res) => {
    try {

        // input data

        // {
        //     "shopName":"ulala store",
        //     "location":{
        //         "country":"india",
        //         "city":["kolkata", "panskura"],
        //         "pin":721232
        //     }
        // }

        const { shopName, location } = req.body;
        console.log(shopName, location);

        // upload image
        // shopImage

        const newShop = await Shop.create({
            shopName,
            location,
            owner: req.user._id,
            // shopImage: {
            //     url: ,
            //     public_id: 
            // },
        })

        res.status(200).json({
            success: true,
            message: "Shop created",
            newShop
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Try again"
        })
    }
}

export const getAllShops = async (req, res) => {
    try {

        const allShops = await Shop.find().populate('owner')

        console.log("ZZZ", req.user);

        res.status(200).json({
            success: true,
            message: "All shop found",
            allShops
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Try again"
        })
    }
}
export const getShopDetails = async (req, res) => {
    try {

        const { shopid } = req.params
        console.log(shopid);

        const shop = await Shop.findById(shopid)

        if(!shop) {
            return res.status(200).json({
                success: false,
                message: "Shop not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Shop Details",
            shop
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Try again"
        })
    }
}
export const editShopImage = async (req, res) => {
    try {
        const { shopid } = req.params

        // get the image
        const { shopName } = req.body

        // upload the image and edit bollow

        const shop = await Shop.findByIdAndUpdate(shopid, {
            shopName
        }, { returnDocument: 'after' });

        res.status(200).json({
            success: true,
            message: "Shop Logo updated successfully",
            shop
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Try again"
        })
    }
}
export const editShopDetails = async (req, res) => {
    try {
        const { shopid } = req.params

        const checkShop = await Shop.findById(shopid)
        if (req.user._id != checkShop.owner && !checkShop) {
            return res.status(200).json({
                success: false,
                message: "You are not the owner of this shop"
            })
        }


        const { shopName, location } = req.body;

        const shop = await Shop.findByIdAndUpdate(shopid, {
            shopName,
            location
        }, { returnDocument: 'after' });

        res.status(200).json({
            success: true,
            message: "Shop Upadted successfully",
            shop
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Try again"
        })
    }
}
export const deleteShop = async (req, res) => {
    try {
        const { shopid } = req.params

        const shop = await Shop.findByIdAndDelete(shopid);

        res.status(200).json({
            success: true,
            message: "Shop deleted successfully",
            shop
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Try again"
        })
    }
}



