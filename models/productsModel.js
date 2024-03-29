import mongoose from "mongoose";

const productSchema = new mongoose.Schema({


    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
    },
    description: {
        type: Number,
    },
    productImage: {
        url: String,
        public_id: String
    },
    shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const Product = mongoose.model('Product', productSchema);