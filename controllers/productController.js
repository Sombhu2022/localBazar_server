import { User } from "../models/userModel.js"

export const createProduct = (req, res) => {
    try {



        res.status(200).json({
            success: true,
            message: "Product created successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
}



