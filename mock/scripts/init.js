const { products, carts } = require("../helpers/db");

const init = async () => {
  await products.deleteMany({}, '/');
  await carts.deleteMany({},'/');
  const generatedProducts = [...Array(100)].map((_, i) => ({
    id: `${i + 1}`,
    label: `product${i + 1}`,
    price: (i + 1) * 999,
  }));

  const generatedCarts = [...Array(15)].map((_, i, total) => {
    const cartProducts = [...Array(total.length % (i + 1))].map(
      (__, j) => `${((j + 1) * (73 * i)) % 98 + 1}`
    );
    return {
      id: `${i + 1}`,
      label: `cart${i + 1}`,
      products: cartProducts,
    };
  });
  await products.insertMany( generatedProducts,'/products[]');
  await carts.insertMany( generatedCarts,'/carts[]');
};

init()
  .then(() => {
    console.log("Init ok!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Init ko!", err);
    process.exit(0);
  });
