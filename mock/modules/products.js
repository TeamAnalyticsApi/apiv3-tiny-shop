const { products } = require("../helpers/db");

const getProduct = (id) => products.findOne('/products',id );

const getAllProducts = () => products.find('/products');

module.exports = { getProduct, getAllProducts };
