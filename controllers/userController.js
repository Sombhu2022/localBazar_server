import { User } from "../models/userModel.js"

export const getUserProfile = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
}



export const logout = async (req, res) => {
    try {

        let user = await User.findById(req.user._id)
        console.log(user);
        user.token = null;
        user.save();

        res.status(200).json({
            success: true,
            message: "logout successful",
            token: null
        })


    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cannot logout user"
        })
    }
}