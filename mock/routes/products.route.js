const { Router } = require("express");
const { getProduct, getAllProducts } = require("../modules/products");

const router = Router();

router.get("/:id", async (req, res, next) => {
  try {
    const result = await getProduct(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllProducts();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
