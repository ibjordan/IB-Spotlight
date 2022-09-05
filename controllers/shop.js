const req = require('express/lib/request');
const res = require('express/lib/response');
const Product = require('../Model/product');
const Cart = require('../Model/cart');




exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/products',
    });
  });
};


//params accede a los parametros de la URL sentenciados en la ruta
exports.getProduct = (req, res, next) => {
  const products = Product.fetchAll(products => {
    const prodId = req.params.productId; 
    Product.findById(prodId, product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle : product.title,
        path: '/products'
      });
    })
  });
};



exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};


exports.getLogOut = (req, res, next) => {
  res.render('shop/log-out', {
    pageTitle: 'Log Out',
    path: '/log-out',
  })
    // .then(pe.setPerson({ email: "ignacio.jordan@infobip.com" }))
    // .then(() => pe.updatePerson({ firstName: "Ignacio", lastName: "Jordan"}))
    // .then(() => pe.track('logout'));
};




exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll( products => {
      const cartProducts = [];
      for (product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData){
          cartProducts.push({productData : product, quantity : cartProductData.quantity});
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      });
    })
  })
};


exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId,product.price);
  })
  res.redirect('/cart');
}



exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Your Checkout',
    path: '/checkout'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Order',
    path: '/orders'
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart')
  })
}




