// Load env-vars
require('dotenv').config();

// Requiring dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Initialize express
const app = express();

// Requiring routers
const paymentRouter = require('./routes/paymentRouter');
const productRouter = require('./routes/productRouter');
const adminRouter = require('./routes/adminRouter');
const orderRouter = require('./routes/orderRouter');
const uploadRouter = require('./routes/uploadRouter');

// Requiring middlewares
const errorMiddleware = require('./middleware/Error');

// Require db configs
const connectToDb = require('./config/db');

// Require cloudinary configs
const cloudinary = require('./config/cloudinary');

// Uncaught exception handling
process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// Connect to database
connectToDb();

// Using middlewares
// Enable CORS for multiple origins
app.use(
  cors({
    origin: process.env.CORS_ORIGINS.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// JSON parsing with 50mb limit
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Basic API route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API service running 🚀',
  });
});

// Using routers
app.use('/api/payment', paymentRouter);
app.use('/api/products', productRouter);
app.use('/api/admin', adminRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

// Error handling middleware
app.use(errorMiddleware);

// Starting server
app.listen(process.env.PORT || 8001, () => {
  console.log('Server running on port', process.env.PORT || 8001);
});






