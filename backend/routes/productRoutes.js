const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Unable to fetch products' });
    }
});

// Add product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            image
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Unable to add product' });
    }
});

module.exports = router;