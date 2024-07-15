const category = require("../model/category.schema");
const { imageUpload } = require("../middleware/imageUpload");

const create = (req, res) => {
  imageUpload(req, res, async function (err) {
    if (err) {
      console.log("Error uploading files:", err);
      return res.status(500).send("Error uploading files");
    }
    const { name } = req.body;
    const catimage = req.files.catimage ? req.files.catimage[0].path : null;
    const caticon = req.files.caticon ? req.files.caticon[0].path : null;

    try {
      await category.create({ name, image: catimage, icon: caticon });
      res.redirect('back');
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).send("Server error");
    }
  });
};

const get = async (req, res) => {
  let data = await category.find();
  res.send(data);
};

const table = async (req, res) => {
  try {
    const categories = await category.find();
    res.render('Pages/categoryTable', { categories: categories });
  } catch (error) {
    console.log(error);
  }
};

const form = async (req, res) => {
  try {
    res.render('Pages/addCategoryForm');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { create, get, table, form };
