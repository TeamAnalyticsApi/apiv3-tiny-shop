const { Router } = require("express");
const {
  getAllCarts,
  getCart,
  setCartProducts,
} = require("../modules/carts");
const { getProduct } = require("../modules/products");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllCarts();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await getCart(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/:cartId/products/:productId", async (req, res, next) => {
  try {
    const { cartId, productId } = req.params;
    const existingProduct = await getProduct(productId);
    if (!existingProduct) {
      return res.status(404).send(`Unknown productId ${productId}`);
    }
    const existingCart = await getCart(cartId);
    if (!existingCart) {
      return res.status(404).send(`Unknown cartId ${cartId}`);
    }
    const cartProducts = existingCart.products.concat(productId);
    await setCartProducts(cartId, cartProducts);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:cartId/products/last", async (req, res, next) => {
  try {
    const { cartId } = req.params;

    const existingCart = await getCart(cartId);
    if (!existingCart) {
      return res.status(404).send(`Unknown cartId ${cartId}`);
    }
    existingCart.products.pop()
    await setCartProducts(cartId, existingCart.products);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
