const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/', async(req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    }
    catch(err){
        res.status(400).json({
            error: err.message
        });
    }
});

router.get('/', async(req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

router.get('/', async(req, res) => {
    const customer = await Customer.findById(req.pararms.id);
    if(!customer){
        return res.status(404).json({
            error: 'Not Found'
        });
    }
    else{
        res.json(customer);
    }
});

router.put('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req,body, { new: true});
    res.json(customer);
});

router.delete('/:id', async(req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({
        message: 'Customer deleted'
    });
});

module.exports = router;