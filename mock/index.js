const express = require("express");
const app = express();

const port = 8293;

app.use("/products", require("./routes/products.route"));
app.use("/carts", require("./routes/carts.route"));

app.listen(port, () => {
  console.log(`Service listening on port ${port}`);
});
