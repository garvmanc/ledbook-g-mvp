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

app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/users', userRoutes);


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MONGODB Connected'))
.catch((err) => console.error('MONGODB connection error', err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));