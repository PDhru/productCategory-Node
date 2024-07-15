const { Router } = require('express');
const { addProductForm, addProduct, getProducts, showProductTable,editProductForm, updateProduct, deleteProduct } = require('../controller/product.controller');

const productRouter = Router();
productRouter.get('/add', addProductForm);
productRouter.post('/add', addProduct);
productRouter.get('/', getProducts);
productRouter.get('/table', showProductTable);
productRouter.get('/edit/:id', editProductForm);
productRouter.post('/edit/:id', updateProduct);
productRouter.get('/delete/:id', deleteProduct);

module.exports = productRouter;
