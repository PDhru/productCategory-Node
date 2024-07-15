const mongoose = require('mongoose');

const extracategoryschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    }
})

const extracategory = mongoose.model('extracategory', extracategoryschema);

module.exports = extracategory;