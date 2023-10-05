const { Router } = require("express");
const { API_URL } = require("../config.json");
const got = require("got");
const {getCartPrice, getCartLabel} = require("../cartHandler");

const router = Router();

router.get("/top", async (req, res, next) => {
  // On récupère tous les paniers
  const allCarts = await got.get(`${API_URL}/carts`).json();
  let prixMaximum = 0;
  let cartLePlusCher = null;

  // On boucle sur tous les paniers pour trouver le plus cher
  for (let i = 0; i < allCarts.length; i++) {
    const thisCart = allCarts[i];

    const cartPrice = await getCartPrice(thisCart.id);

    // Si le panier est actuellement le plus cher, on enregistre ses infos
    if (cartPrice > prixMaximum) {
      cartLePlusCher = thisCart;
      prixMaximum = cartPrice;
    }
  }

  res
    .status(200)
    .send({ cartId: cartLePlusCher.label, cartPrice: prixMaximum });
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cartPrice = await getCartPrice(id);
    const cartLabel = getCartLabel(id);
    const result = {
      id: id,
      label: cartLabel,
      price: cartPrice,
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

router.put("/:cartId/products/:productId", () => {
  res.status(500).send("Not implemented");
});

module.exports = router;
