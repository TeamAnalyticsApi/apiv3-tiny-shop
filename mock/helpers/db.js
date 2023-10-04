const { JsonDB } = require("node-json-db");
const { promisify } = require("util");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")
class Db {
  constructor(collection) {
    this.db = new JsonDB( new Config("mock/db/"+collection, true, true, '/'));
  }

  async find(path) {

     return this.db.getData(path);
  }

  async findOne(path, query) {
    const id=this.db.getIndex(path,query,'id');
    return this.db.getData(path+"["+id+"]");
  }

  async insertMany(docs,dataPath) {
    return docs.map(doc => this.db.push(dataPath, doc));
  }

  async deleteMany(filter, path) {
    return this.db.delete(path);
  }

  async updateOne(path, filter, update) {
    const id=this.db.getIndex(path,filter,'id');
    const cart= this.db.getData(path+"["+id+"]");
    cart.products=update.$set.products;
    return this.db.push(path+"["+id+"]",cart);
  }

  async updateMany(filter, update) {
    const asyncUpdate = promisify(this.db.update.bind(this.db));
    return asyncUpdate(filter, update, { multi: true });
  }
}

const carts = new Db("carts");
const products = new Db("products");
module.exports = { carts, products };
