const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

// app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per 1$

// Endpoint - 1 (Calculate the total price of items in the cart)
function calculateCartTotal(newItemPrice, cartTotal) {
  result = cartTotal + newItemPrice;
  return result.toString();
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateCartTotal(newItemPrice, cartTotal));
});
// Path = /cart-total?newItemPrice=1200&cartTotal=0

// Endpoint - 2 (Apply a discount based on membership status)
function calculateMembershipDiscount(cartTotal, isMember) {
  result = cartTotal;
  if (isMember) {
    result = cartTotal - cartTotal * (discountPercentage / 100);
  }
  return result.toString();
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  res.send(calculateMembershipDiscount(cartTotal, isMember));
});

// Endpoint - 3 (Calculate tax on the cart total)
function calculateTax(cartTotal) {
  let result = cartTotal * (taxRate / 100);
  return result.toString();
}

app.get('/calculate-tax', (req, res) => {
  cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal));
});
// Path = /calculate-tax?cartTotal=3600

// Endpoint - 4 (Estimated delivery time based on shipping method)
function estimateDelivery(shippingMethod, distance) {
  result = -1;
  if (shippingMethod === 'express') {
    result = distance / 100;
  }
  if (shippingMethod === 'standard') {
    result = distance / 50;
  }
  return result.toString();
}

app.get('/estimate-delivery', (req, res) => {
  shippingMethod = req.query.shippingMethod;
  distance = parseFloat(req.query.distance);

  res.send(estimateDelivery(shippingMethod, distance));
});
// Path = /estimate-delivery?shippingMethod=express&distance=600

// Endpoint - 5 (Calculate the shipping cost based on weight and distance)
function shippingCost(weight, distance) {
  let result = weight * distance * 0.1;
  return result.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(shippingCost(weight, distance));
});
// Path = /shipping-cost?weight=2&distance=600

// Endpoint - 6 (Calculate loyalty points earned from a purchase)
function loyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  return loyaltyPoints.toString();
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyaltyPoints(purchaseAmount));
});
// Path = /loyalty-points?purchaseAmount=3600

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
