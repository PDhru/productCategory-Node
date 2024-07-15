const {Router} = require('express')
const { create, table, form ,  get } = require('../controller/category.controller');
const { imageUpload } = require("../middleware/imageUpload");

const catRouter = Router();
catRouter.post('/create', create);
catRouter.get('/create', form);
catRouter.get('/get', get);
catRouter.get('/', table);

module.exports = catRouter;