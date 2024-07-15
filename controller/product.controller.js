const Product = require("../model/product.schema");
const Category = require("../model/category.schema");
const SubCategory = require("../model/subcategory.schema"); 
const ExtraCategory = require("../model/extracategory.schema"); 
const { imageUpload } = require("../middleware/imageUpload");

const addProductForm = async (req, res) => {
  try {
    const categories = await Category.find();
    const subCategories = await SubCategory.find();
    const extraCategories = await ExtraCategory.find();
    res.render('Pages/addProductForm', { categories, subCategories, extraCategories });
  } catch (error) {
    console.log(error);
  }
};

const addProduct = (req, res) => {
  imageUpload(req, res, async function (err) {
    if (err) {
      console.log("Error uploading files:", err);
      return res.status(500).send("Error uploading files");
    }
    const { name, description, price, category, subCategory, extraCategory } = req.body;

    const productImage = req.files.productimage ? req.files.productimage[0].filename : null;
    try {
      const newProduct = await Product.create({ name, description, price, category, subCategory, extraCategory, image: productImage });
      console.log("New product is created : ",newProduct);
      res.redirect('/');
    } catch (error) { 
      console.error("Error creating product:", error);
      res.status(500).send("Server error");
    }
  });
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('subCategory').populate('extraCategory');
    res.render('Pages/productTable', { products });
  } catch (error) {
    console.log(error);
  }
};
const showProductTable = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('subCategory').populate('extraCategory');
    console.log(products);
    res.render('Pages/productTable', { products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};



const editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();
    const subCategories = await SubCategory.find();
    const extraCategories = await ExtraCategory.find();
    res.render('Pages/editProductForm', { product, categories, subCategories, extraCategories });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = (req, res) => {
  imageUpload(req, res, async function (err) {
    if (err) {
      console.log("Error uploading files:", err);
      return res.status(500).send("Error uploading files");
    }
    const { name, description, price, category, subCategory, extraCategory } = req.body;
    const productImage = req.files.productimage ? req.files.productimage[0].filename : req.body.existingImage;
    try {
      await Product.findByIdAndUpdate(req.params.id, { name, description, price, category, subCategory, extraCategory, image: productImage });
      res.redirect('/product/table');
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Server error");
    }
  });
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/product/table');
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Server error");
  }
};

module.exports = { addProductForm, addProduct, getProducts, showProductTable, editProductForm, updateProduct, deleteProduct};
