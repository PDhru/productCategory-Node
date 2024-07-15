const { Router } = require('express');
const { create, table, get, form } = require('../controller/subcategory.controller');

const subcatRouter = Router();
subcatRouter.post('/create', create);
subcatRouter.get('/create', form);
subcatRouter.get('/get', get);
subcatRouter.get('/', table);

module.exports = subcatRouter;