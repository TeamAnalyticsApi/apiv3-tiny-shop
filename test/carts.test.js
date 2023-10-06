const testsHelper = require("./tests.helper");
const request = require("supertest");
const { expect } = require("chai");
const config = require("../src/config.json");
const got = require("got");

let app;

describe("carts routes", () => {
  before(async () => {
    app = await testsHelper.getApp();
  });

  describe("top", () => {
    it("should return the most expensive cart's informations", async () => {
      const res = await request(app).get("/carts/top").expect(200);
      expect(res.body).to.deep.equal({
        cartId: "9",
        cartPrice: 509490,
      });
    });
  });

  describe("get by id", () => {
    it("should return the asked cart's infos", async () => {
      await request(app)
        .get("/carts/1")
        .expect(200, { id: "1", label: "cart1", price: 0 });
      await request(app)
        .get("/carts/4")
        .expect(200, { id: "4", label: "cart4", price: 140859 });
    });
    it("should throw a 404 error if no cart is found", async () => {
      await request(app).get("/carts/HalloIDoNotExist").expect(404);
    });
  });

  describe("add product to cart", () => {
    it("should throw a 404 error if no carts are found", async () => {
      await request(app).put("/carts/HalloIDoNotExist/products/4").expect(404);
    });

    it("should throw a 404 error if no products are found", async () => {
      await request(app).put("/carts/1/products/HalloIDoNotExist").expect(404);
    });

    it("should add the product to the cart", async () => {
      const res = await request(app).get("/carts/top").expect(200);
      const topCartId = res.body.cartId;
      try {
        await request(app).put(`/carts/${topCartId}/products/1`).expect(200);
      } catch (err) {
        expect(true).to.equal(false, `An error occured: ${err.message}`);
      } finally {
        await got.delete(`${config.API_URL}/carts/${topCartId}/products/last`);
      }
    });
  });
});
