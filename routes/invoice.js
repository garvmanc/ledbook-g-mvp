const express = require('express');

const router = express.Router();

const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

router.post('/', async(req, res) => {
    try{
        const { customer, items, hsn } = req.body;

        let totalAmt = 0;
        let cgst = 0;
        let sgst = 0;
        let igst = 0;
        
        items.forEach(item => {
            const itemTotal = item.unitPrice * item.quantity;
            totalAmt += itemTotal;
            const taxAmt = (itemTotal * item.gstRate)/100;
            cgst += taxAmt/2;
            sgst += taxAmt/2;
        });

        const invoiceCount = await Invoice.countDocuments();
        const invoiceNumber = `Invoice-${invoiceCount + 1}`;
        const invoice = new Invoice({
            invoiceNumber,
            customer,
            items,
            totalAmt,
            tax: { cgst, sgst, igst },
            hsn,
            status: 'unpaid',
            date: new Date()
        });
        await invoice.save();
        for(const item of items){
            await Product.findByIdAndUpdate(item.product, {
                $inc: { currentStock: -item.quantity }
            });
        }

        res.status(201).json(invoice);
    }
    catch(err){
        res.status(400).json({
            error: err.message
        });
    }
});

router.get('/:id', async (req, res) =>  {
    const invoice = await Invoice.findById(req.params.id)
    .populate('customer')
    .populate('items.product');
    if(!invoice){
        return res.status(404).json({
            eror: 'Not found'
        });
    }
    else{
        res.json(invoice);
    }
});

router.put('/:id/status', async (req, res) => {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );
    res.json(invoice);
});

router.delete('/:id', async (req, res) => {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({
        message: 'Invoice deleted'
    });
});

module.exports = router;