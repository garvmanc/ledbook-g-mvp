const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    const { vendorName, items } = req.body;

    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += item.unitPrice * item.quantity;
    });

    const purchase = new Purchase({
      vendorName,
      items,
      totalAmount,
      date: new Date()
    });

    await purchase.save();

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { currentStock: item.quantity }
      });
    }

    res.status(201).json(purchase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const purchases = await Purchase.find().populate('items.product');
  res.json(purchases);
});

router.get('/:id', async (req, res) => {
  const purchase = await Purchase.findById(req.params.id).populate('items.product');
  if (!purchase) return res.status(404).json({ error: 'Purchase not found' });
  res.json(purchase);
});

router.delete('/:id', async (req, res) => {
  await Purchase.findByIdAndDelete(req.params.id);
  res.json({ message: 'Purchase deleted' });
});

module.exports = router;