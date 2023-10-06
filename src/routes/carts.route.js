const { Router } = require("express");
const { API_URL } = require("../config.json");
const got = require("got");

const router = Router();

router.get("/top", async (req, res, next) => {
  // On récupère tous les paniers
  const allCarts = await got.get(`${API_URL}/carts`).json();
  let prixMaximum = 0;
  let cartLePlusCher = null;

  // On boucle sur tous les paniers pour trouver le plus cher
  for (let i = 0; i < allCarts.length; i++) {
    let totalPrice = 0;
    let thisCart = allCarts[i];

    // On boucle sur tous les identifiants de produit de chaque panier
    for (let j = 0; j < thisCart.products.length; j++) {
      let thisProductId = thisCart.products[j];

      // On récupère les infos complètes de ce produit pour récupérer son prix et le rajouter au total du panier
      let thisProduct = await got
        .get(`${API_URL}/products/${thisProductId}`)
        .json();
      totalPrice = totalPrice + thisProduct.price;
    }

    // Si le panier est actuellement le plus cher, on enregistre ses infos
    if (totalPrice > prixMaximum) {
      cartLePlusCher = thisCart;
      prixMaximum = totalPrice;
    }
  }

  res
    .status(200)
    .send({ cartId: cartLePlusCher.label, cartPrice: prixMaximum });
});

router.get("/:id", async (req, res, next) => {
  try {
    const listOfCarts = await got.get(`${API_URL}/carts`).json();
    const listOfIds = listOfCarts.map((object) => object.id);
    if (!listOfIds.includes(req.params.id)) {
      res.sendStatus(404);
    } else {
      var id = req.params.id;
      const cart = await got.get(`${API_URL}/carts/${id}`).json();
      let totalPrice = 0;
      // On boucle sur tous les identifiants de produit de chaque panier
      for (let j = 0; j < cart.products.length; j++) {
        let thisProductId = cart.products[j];

        // On récupère les infos complètes de ce produit pour récupérer son prix et le rajouter au total du panier
        let thisProduct = await got
          .get(`${API_URL}/products/${thisProductId}`)
          .json();
        totalPrice = totalPrice + thisProduct.price;
      }
      res.status(200).send({
        id: cart.id,
        label: cart.label,
        price: totalPrice,
      });
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

router.put("/cart:cartId/products/:productId", async (req, res, next) => {
  try {
    const listOfCarts = await got.get(`${API_URL}/carts`).json();
    const listOfCartsIds = listOfCarts.map((object) => object.id);
    const listOfProducts = await got.get(`${API_URL}/products`).json();
    const listOfProductsIds = listOfProducts.map((object) => object.id);
    if (!listOfCartsIds.includes(req.params.cartId)) {
      res.sendStatus(404);
    } else if (!listOfProductsIds.includes(req.params.productId)) {
      res.sendStatus(404);
    } else {
      await got.put(
        `${API_URL}/carts/${req.params.cartId}/products/${req.params.productId}`
      );
      res.sendStatus(200);
    }
  } catch (err) {}
});

module.exports = router;
