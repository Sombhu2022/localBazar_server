import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticate = async (req, res, next) => {
    try {
     
        const token = req.headers.token

        if (!token) {

            res.status(400).json({
                success: false,
                message: "Login required",
            })
        }
        const decodedData = jwt.verify(
            token, process.env.JWT_SECRET
        )

        console.log(decodedData);

        req.user = await User.findById(decodedData._id)
        next()

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Login required",
        })
    }
}