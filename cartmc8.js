const fs = require('fs');

class Cart{
    constructor(){
        this.cart =[];
        this.discount = 0.0;
    }
    addItem(obj) {
        this.cart.push(obj);
        return this;
    }
    removeItem(obj) {
        this.cart.splice(this.cart.findIndex(x => x.item_id === obj.item_id), 1)
        return this;
    }
    addDiscount(disc) {
        this.discount = parseFloat(disc)/100;
        return this;
    }
    totalItems() {
        return this.cart.length;
    }
    totalQuantity() {
        return this.cart.reduce((a, b) => a + (b.quantity ? b.quantity : 1), 0)
    }
    totalPrice() {
        return (1-this.discount)*this.cart.reduce((a, b) => a + (b.price * (b.quantity ? b.quantity : 1)), 0);
    }
    showAll(){
        console.log(this);
        return this;        
    }
    checkout() {
        fs.writeFileSync('cart.txt', JSON.stringify(this));
    }
}

const cart = new Cart()

// Do some chainings
cart.addItem({ item_id: 1, price: 30000, quantity: 3 })
    .addItem({ item_id: 2, price: 10000 })               // By default quantity is 1
    .addItem({ item_id: 3, price: 5000, quantity: 2 })
    .removeItem({ item_id: 2 })
    .addItem({ item_id: 4, price: 400, quantity: 6 })
    .addDiscount('50%')

console.log(cart.totalItems()) // 3

console.log(cart.totalQuantity()) // 11

console.log(cart.totalPrice()) // 51200

cart.showAll() // Show all items in cart

cart.checkout() // Store data in a file

