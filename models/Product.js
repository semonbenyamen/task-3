const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: ["1"]
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ["Electronics"],
            message: "Please choose Electronics only"
        }
    },

}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);