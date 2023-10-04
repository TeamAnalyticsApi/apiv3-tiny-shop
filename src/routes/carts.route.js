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
      totalPrice = totalPrice + thisProduct.label;
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
    var id = req.params.id;
    const product = await got.get(`${API_URL}/carts/${id}`).json();
    let totalPrice = 0;
    // On boucle sur tous les identifiants de produit de chaque panier
    for (let j = 0; j < product.products.length; j++) {
      let thisProductId = product.products[j];

      // On récupère les infos complètes de ce produit pour récupérer son prix et le rajouter au total du panier
      let thisProduct = await got
        .get(`${API_URL}/products/${thisProductId}`)
        .json();
      totalPrice = totalPrice + thisProduct.label;
    }
    res.status(200).send({
      id: product.labeI,
      label: product.id,
      price: totalPrice,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:cartId/products/:productId", () => {
  res.status(500).send("Not implemented");
});

module.exports = router;
