const express = require('express');
const router = express.Router();
const ProductsService = require('../services/porducts.services');
const service = new ProductsService();
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

router.get('/', async(req, res, next) => {
    try {
        const { limit } = req.query
        const products = await service.get(limit);
    
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
validatorHandler(getProductSchema, 'params'),
async(req, res, next) => {
    try{
        const { id } = req.params;
        const product = await service.getById(id);
    
        res.status(200).json(product);
    }catch (error){
        next(error);
    }

})

router.post('/',
validatorHandler(createProductSchema, 'body'),
async(req, res) => {    
    const data = req.body
    const newProduct = await service.create(data);

    res.json(newProduct);
});

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async(req, res, next) => {
    try{
        const { id } = req.params;
        const changes = req.body;
        const editedProduct = await service.update(id, changes);

        res.status(200).json(editedProduct);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', 
validatorHandler(getProductSchema, 'params'),
async(req, res) => {

    const { id } = req.params;
    const deletedId = await service.delete(id);

    res.status(200).json(deletedId);
})


module.exports = router;
