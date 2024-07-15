const { Router } = require('express');
const { create, table,get, form } = require('../controller/extracategory.controller');

const extraRouter = Router();
extraRouter.post('/create', create);
extraRouter.get('/create', form);
extraRouter.get('/get', get);
extraRouter.get('/', table);

module.exports = extraRouter;