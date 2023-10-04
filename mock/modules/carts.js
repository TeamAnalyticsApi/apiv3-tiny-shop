const { carts } = require("../helpers/db");

const getCart = (id) => carts.findOne('/carts', id );

const getAllCarts = () => carts.find('/carts');

const setCartProducts = (cartId, products) => carts.updateOne('/carts',  cartId , { $set: { products } })

module.exports = { getCart, getAllCarts, setCartProducts };
