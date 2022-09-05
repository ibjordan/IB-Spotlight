const fs = require('fs');
const axios = require('axios');

const path = require('path');
const { runInThisContext } = require('vm');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
);


module.exports = class Cart {
    static addProduct(id, productPrice){
        // Fetch the previous cart
        fs.readFile(p, (err,fileContent) => {
            let cart = {products: [] , totalPrice: 0};
            if (!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
    
            // add new product increase quantity value
            if (existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.quantity += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else{
                updatedProduct = { id : id, quantity: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            // pe.setPerson({ email: "ignacio.jordan@infobip.com" })
            //     .then(() => { pe.updatePerson({ firstName: "Ignacio", lastName: "Jordan"})
            //     .then( () => {pe.track('agregarCesto')}) 
            // });
            cart.totalPrice += +productPrice;
            // let options = {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json;charset=utf-8',
            //       'Authorization' : 'App 0462df82756bfdd0aca3186b257e1b97-13fab2e8-4f50-46b8-b6b2-b48a31968655'
            //     },
            //     body: {}
            //   }
            // const response = fetch('https://zjvjz6.api.infobip.com/peopleevents/1/persons/nacho_10_jordan@hotmail.com/definitions/logout/events?personIdentifierType=EMAIL', options);
            axios.post('https://zjvjz6.api.infobip.com/peopleevents/1/persons/nacho_10_jordan@hotmail.com/definitions/logout/events?personIdentifierType=EMAIL',{}, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization' : 'App 0462df82756bfdd0aca3186b257e1b97-13fab2e8-4f50-46b8-b6b2-b48a31968655'
                }
            });
            fs.writeFile(p,JSON.stringify(cart), err =>{
                console.log(err);
            })
        })
    }
    static deleteProduct(id,productPrice){
        fs.readFile(p, (err,fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err){
                return;
            }
            const updatedCart = {...cart};
            const product = updatedCart.products.find(p => p.id === id)
            if(!product){
                return;
            }
            const productQty = product.quantity;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty
            fs.writeFile(p,JSON.stringify(updatedCart), err =>{
                console.log(err);
            })
        })
    }

    static getCart(cb){
        fs.readFile(p, (err,fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err){
                cb(null);
            }
            cb(cart)
        })
    }
}
