import { Product } from "../models/productsModel.js";
import { Shop } from "../models/shopModel.js";
import { User } from "../models/userModel.js"

import { imageDestroy } from "../utils/imageDestroy.js";


import { imageUploader } from "../utils/imageUploder.js";

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


        const { shopName, shopImage, pin, city, country, customerCareNumber } = req.body;

        console.log(req.body);
        const location = {
            country,
            city,
            pin,


        }
        console.log(location);
        // upload image
        const data = await imageUploader(shopImage)
        console.log(data?.url, data?.public_id);

        // const 

        // shopImage

        const newShop = await Shop.create({
            shopName,
            location,
            customerCareNumber,
            owner: req.user._id,
            shopImage: {

                url: data?.url,
                public_id: data?.public_id

            },
        })

        res.status(200).json({
            success: true,
            message: "Shop created",
            newShop
        })
        console.log('ok');
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

            .populate('owner')
            .populate('products')
            .populate(
                {
                    path: "reviews",
                    populate: {
                        path: "user",
                        model: "User"
                    }
                }
            )


        if (!shop) {
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
        const { shopImage } = req.body
        console.log("shop image is", shopImage);

        const shop = await Shop.findById(shopid);

        if (!shop) {
            return res.status(400).json({
                success: false,
                message: "shop not found"
            })
        }
        // delete existing image 
        if (shop.shopImage?.public_id) {
            await imageDestroy(shop.shopImage.public_id)
        }
        // upload new image on cloudinary
        const image = await imageUploader(shopImage)
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "imasge not upload on cloud server"
            })
        }

        const updateShopImage = {
            url: image?.url,
            public_id: image?.public_id
        }

        // upload the image and edit bollow
        const updateshop = await Shop.findByIdAndUpdate(shopid, {
            shopImage: updateShopImage
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Shop Logo updated successfully",
            shop: updateshop
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
        const { shopName, city, customerCareNumber, country, pin } = req.body

        console.log("body", shopName, city, req.body);
        // const checkShop = await Shop.findById(shopid)
        // if (req.user._id != checkShop.owner && !checkShop) {
        //     return res.status(200).json({
        //         success: false,
        //         message: "You are not the owner of this shop"
        //     })
        // }
        const location = {
            country,
            city,
            pin,

        }

        // const shop = await Shop.findByIdAndUpdate(shopid,{ shopName , location , customerCareNumber} , { returnDocument: 'after' });
        const shop = await Shop.findByIdAndUpdate(shopid, { shopName, location, customerCareNumber }, { new: true });
        // console.log(shop);

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

        const shop = await Shop.findById(shopid).populate('products')

        if (shop) {
            await imageDestroy(shop.shopImage?.public_id)

            shop.products.map(async (product) => {
                await imageDestroy(product?.productImage?.public_id)
                await Product.findByIdAndDelete(product._id)
            })

            console.log("ok");
            await Shop.findByIdAndDelete(shopid);
            res.status(200).json({
                success: true,
                message: "Shop deleted successfully",
                shop
            })
        } else {
            res.status(400).json({
                success: true,
                message: "Shop not found",
                shop
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Try again"
        })
    }
}



const reviewPresent = (shop, userid) => {
    return shop?.reviews?.find((ele) => {
        if (String(ele?.user?._id) === String(userid)) {
            console.log("ok");
            return ele
        } else {
            return ""
        }
    })
}


export const postShopReview = async (req, res) => {
    try {
        const user = req.user;
        const { shopId } = req.params;
        const { rating, message } = req.body
        const shop = await Shop.findById(shopId)
            .populate('owner')
            .populate('products')
            .populate('reviews.user')
            .populate(
                {
                    path: "reviews",
                    populate: {
                        path: "user",
                        model: "User"
                    }
                }
            )

        console.log(user._id);
        console.log("log", reviewPresent(shop, user._id));

        if (reviewPresent(shop, user._id)) {

            const existReview = reviewPresent(shop, user._id)

            // console.log("review " , review);

            if (rating) existReview.rating = rating
            if (message) existReview.message = message


        } else {
            shop?.reviews.push(
                {
                    user: user._id,
                    rating,
                    message
                }
            )


        }

        const totalReview = shop?.reviews.length

        let totalRating = 0;
        shop.reviews?.map((ele) => {

            totalRating += ele.rating
        })

        shop.ratings = totalRating / totalReview

        // save finding product with out schema varification 
        await shop.save({ validateBeforeSave: false })

        // this call populate maping ...  
        // console.log(data);
        res.status(200).json({
            message: "review add",
            shop
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "review not add",
            error
        })

    }
}



export const getShopByShopName = async (req, res) => {
    const { shopName } = req.params;
    try {
        if (!shopName) return res.status(404).json({
            success: false,
            message: "put shop  name"
        })
        // shopName:{ $regex: shopName, $options: 'i' } $regex for regula expretion and option : i for case insentive
        const shop = await Shop.find({ shopName: { $regex: shopName, $options: 'i' } })

        if (!shop) return res.status(400).json({
            success: false,
            message: "shop not found"
        })

        res.status(200).json({
            success: true,
            message: "all sops are",
            shop
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "somthing error try Again !",
            error
        })
    }
}

export const getShopByCityOrProductName = async (req, res) => {
    const { productName, city } = req.body
    try {

      console.log(productName , city);
    // if (productName) {
    //     const products = await Product.find({ name: { $regex: productName, $options: 'i' } });
    //     const productIds = products.map(product => product._id);
    //     query.products = { $in: productIds };
    //   }
  
    //   if (city) {
    //     query['location.city'] = city;
    //   }
    let findShops = []
    
    const shop = await Shop.find({}).populate('products');
    // console.log(shop);
    if(!shop) return res.status(400).json({ message:" shop not found"})
    // productName = { $regex: productName, $options: 'i' }
if(productName){
        // console.log("product" , productName);
        shop.forEach((ele)=>{
            ele?.products?.map((product)=>{
                if(product.productName == productName){
                    findShops.push(ele)
                }
            })
        })
    }
    
    if(city){
        console.log("city" , city);
        shop.forEach((ele)=>{
            ele?.location?.city?.map((cityName)=>{
                if(cityName === city){
                    findShops.push(ele)
                }
            })
        })
    }

    console.log(findShops);

      res.status(200).json({
        success: true,
        message: "all sops are",
        shop:findShops
    })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "somthing error try again!"
        })
    }
}

