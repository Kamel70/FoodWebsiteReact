import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  try {
    // Fix: Use req.body directly instead of req.body.order
    const orderData = req.body;
    
    // Add logging to debug
    console.log('Received order data:', orderData);
    
    // Check if orderData exists and has required properties
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: 'Missing order data or items.' });
    }
    
    // Check if customer data exists
    if (!orderData.customer) {
      return res.status(400).json({ message: 'Missing customer data.' });
    }
    
    // Validate customer data with better null/undefined checks
    const { customer } = orderData;
    if (
      !customer.email ||
      !customer.email.includes('@') ||
      !customer.name ||
      customer.name.trim() === '' ||
      !customer.street ||
      customer.street.trim() === '' ||
      !customer['postal-code'] ||
      customer['postal-code'].trim() === '' ||
      !customer.city ||
      customer.city.trim() === ''
    ) {
      return res.status(400).json({
        message: 'Missing data: Email, name, street, postal code or city is missing.',
      });
    }
    
    // Create new order with proper ID generation
    const newOrder = {
      ...orderData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    
    // Read existing orders with error handling
    let allOrders = [];
    try {
      const ordersData = await fs.readFile('./data/orders.json', 'utf8');
      allOrders = JSON.parse(ordersData);
    } catch (error) {
      // If file doesn't exist or is invalid, start with empty array
      console.log('Orders file not found or invalid, starting with empty array');
      allOrders = [];
    }
    
    // Add new order
    allOrders.push(newOrder);
    
    // Write back to file
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders, null, 2));
    
    res.status(201).json({ 
      message: 'Order created!', 
      orderId: newOrder.id 
    });
    
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ 
      message: 'Internal server error while processing order.' 
    });
  }
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
