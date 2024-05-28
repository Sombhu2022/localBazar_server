import { Product } from "../models/productsModel.js";
import { Shop } from "../models/shopModel.js";

export const isShopController =async(req , res , next)=>{

    const {id , role} = req.user
    const { shopid , productid } = req.params
    try {
        if( role === 'admin') next();
        if(shopid){
    
            const shop = await Shop.findById(shopid)
            if(shop && String(shop?.owner) === String(id)){
                console.log(" ok");
                next();
        }}
        else if(productid){
                const product = await Product.findById(productid).populate('shopRef')
                if(product && String(product?.shopRef?.owner) === String(id)){
                    console.log(" product ok");
                    next()
                }
        }
        
        else{
            console.log("you are not a shop Owner");
            res.status(400).json({
                message:"only shopOwner can be chenge this section",
            })
        }
     
    } catch (error) {
        res.status(400).json({
            message:"somthing error",
        })
    }
}