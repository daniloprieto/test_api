const express = require('express');
const routerUsers = require('./users.router');
const routerProducts = require('./products.router');


function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.get('/health', (req, res) => { res.status(200).send(`APP live`)});
    router.use('/users', routerUsers);
    router.use('/products', routerProducts);
}

module.exports = routerApi;