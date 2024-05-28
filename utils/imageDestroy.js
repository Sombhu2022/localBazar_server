import { v2 as cloudinary } from 'cloudinary';

export const imageDestroy =async(image)=>{
   try {
    if(!image) return 
    const data = await cloudinary.uploader.destroy(image)
    return data
   } catch (error) {
      console.log(error);
   }

}
