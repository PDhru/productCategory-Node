const extracategory = require("../model/extracategory.schema");
const subcategory = require("../model/subcategory.schema");


const create = async (req, res) => {
    try {
        console.log(req.body)
        let data = await extracategory.create(req.body);
        //res.send(data);
        res.redirect('/extracategory/create')
    } catch (error) {
        console.log(error);
    }
}
const get = async (req, res) => {
    try {
        let data = await extracategory.find().populate({
            path: 'subCategoryID',
            populate: {
                path: 'categoryID'
            }
        }
        )
        res.send(data);
    } catch (error) {
        console.log(error);
    }
}
const table = async (req, res) => {
    try {
        const extracategories = await extracategory.find().populate({
            path:'subCategoryID',
            populate:{
                path:'categoryID'
            }
        });
        res.render('Pages/extracategoryTable', { extracategories: extracategories })
    } catch (error) {
        console.log(error)
    }
}
const form = async (req, res) => {
    try {
        const subcategories = await subcategory.find().populate('categoryID');
        res.render('Pages/addExtraCategroryForm',  { subcategories: subcategories })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { create, get, table, form };
