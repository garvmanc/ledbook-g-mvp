const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', async(req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch(err){
        res.status(400).json({
            error: err.message
        });
    }
});

router.get('/', async(req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            error: 'Product not found'
        });
    }
    res.json(product);
});

router.put('/:id', async(req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);  
});

router.put('/:id', async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({
        message: 'Product Deleted'
    });
})

module.exports = router;