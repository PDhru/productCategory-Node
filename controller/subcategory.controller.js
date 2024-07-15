const category = require("../model/category.schema");
const subcategory = require("../model/subcategory.schema");

const create = async (req, res) => {
    try {
        let data = await subcategory.create(req.body);
        console.log('subcat', data)
        res.redirect('back');
    } catch (error) {
        console.log(error)
    }
}

const get = async (req, res) => {
    try {
        let data = await subcategory.find().populate('categoryID');
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

const table = async (req, res) => {
    try {
        const subcategories = await subcategory.find().populate('categoryID');
        res.render('Pages/subcategoryTable', { subcategories: subcategories })
    } catch (error) {
        console.log(error)
    }
}
const form = async (req, res) => {
    try {
        const categories = await category.find()
        res.render('Pages/addSubCategoryForm', { categories: categories })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { create, get, table, form };
