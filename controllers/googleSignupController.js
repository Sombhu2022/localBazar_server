import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const googleSignup = async (req, res) => {
    try {

        
        const { name, email, profilePic , role } = req.body
        let user = await User.findOne({ email })
        console.log(req.headers );
        console.log(req.user);

        if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            user.token = token;
            user.save()

            res.status(200).json({
                success: true,
                message: "Login successful",
                user,
                token
            })
        }
        else{
            let user = await User.create({
                name,
                email,
                profilePic,
                role
            })
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            user.token = token;
            user.save()

            res.status(200).json({
                success: true,
                message: "Registered successful",
                user,
                token
            })

        }

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cannot register user"
        })
    }
}