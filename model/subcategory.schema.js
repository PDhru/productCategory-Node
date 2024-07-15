const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    }
})

const subcategory = mongoose.model('subcategory', subcategorySchema);

module.exports = subcategory;