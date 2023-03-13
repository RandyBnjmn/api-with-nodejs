const faker = require("faker")
const boom = require("@hapi/boom")

class ProducService {

  constructor() {
    this.products = [];
    this.generate();
  }




  find() {
    return this.products;
  }

  findOne(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound("product not found")
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block")
    }
    return product
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
  }
  update(id, data) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound("Product not fount")
      // throw new Error("Product not fount")
    }
    const product = this.products[index];

    this.products[index] = { ...product, ...data }
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound("Product not fount")
    }

    this.products.splice(index, 1);
    return { message: true, id: id }
  }



  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push(
        {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean(),
        }
      )
    }
  }





}

module.exports = ProducService
