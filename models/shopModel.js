import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    shopImage: {
        url: String,
        public_id: String
    },

    ratings: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },

            message: String,
            rating: Number
        }
    ],
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    ],

    location: {
        country: String,
        pin: Number,
        city: [String]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const Shop = mongoose.model('Shop', shopSchema);