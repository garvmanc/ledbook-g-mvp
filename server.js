const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const customerRoutes = require('./routes/customer');
const productRoutes = require('./routes/product');
const invoiceRoutes = require('./routes/invoice');
const purchaseRoutes = require('./routes/purchase');
const userRoutes = require('./routes/user');