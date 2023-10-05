const got = require("got");
const { API_URL } = require("./config.json");
const {NOT_FOUND_ERROR} = require("./utils/Errors");

async function getCartContent(id) {
    return got.get(`${API_URL}/carts/${id}`).json();
}

async function getCartPrice(id) {
    const cartInfo = await getCartContent(id);
    if (id !== cartInfo.id){
        throw Error(NOT_FOUND_ERROR);
    }
    return computeTotalPrice(cartInfo.products);
}

function getCartLabel(id){
    return `cart${id}`;
}

async function getProductInfo(thisProductId) {
    return got
        .get(`${API_URL}/products/${thisProductId}`)
        .json();
}

async function computeTotalPrice(cartProducts) {
    let totalPrice = 0;
    // On boucle sur tous les identifiants de produit de chaque panier
    for (let j = 0; j < cartProducts.length; j++) {
        let productId = cartProducts[j];

        // On récupère les infos complètes de ce produit pour récupérer son prix et le rajouter au total du panier
        let product = await getProductInfo(productId);
        totalPrice = totalPrice + product.price;
    }
    return totalPrice;
}

module.exports = {getCartPrice, getCartLabel}
