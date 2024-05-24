export const isShopOwner =(req , res , next)=>{

    const {role} = req.user
    console.log(role);
    if(role === 'shopOwner'){
        console.log(" ok");
        next();
    }
    else{
        console.log("shopOwner not");
        res.status(400).json({
            message:"only shopOwner can be chenge this section",
        })
    }
 
}