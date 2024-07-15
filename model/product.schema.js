const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory', required: true },
    extraCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'extracategory', required: false },
    image: { type: String, required: true }
});

const Product = mongoose.model('addProduct', productSchema);

module.exports = Product;
