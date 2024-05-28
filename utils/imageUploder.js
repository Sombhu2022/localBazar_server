import { v2 as cloudinary } from 'cloudinary';

export const imageUploader =async(image)=>{
   try {
    if(!image) return 
    const data = await cloudinary.uploader.upload(image , {
        folder:'local-bazar'
    })
    return data
   } catch (error) {
      console.log("error image not uploaded",error);
   }

}