const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/log-out',shopController.getLogOut);

router.get('/products',shopController.getProducts);

// /:productId permite sacar lo enviado en esa url, y  asu vez no busca el literal
router.get('/products/:productId',shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/cart-delete-item', shopController.postDeleteCartItem);

module.exports = router;
