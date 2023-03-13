const express = require("express")
const ProductsService = require("../services/product.service")
const validatorHandler = require('./../middlewares/validator.handler')
const { createProductDto, updateProductDto, getProductDto } = require('./../schemas/producto.dto')
const router = express.Router();
const service = new ProductsService()
router.get("/", (req, res) => {

  const products = service.find();
  // const limit = req.query.size || 10;

  res.json(products)
})

router.get("/:id",
  validatorHandler(getProductDto, "params"),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const product = service.findOne(id);
      res.json(product)
    } catch (error) {
      next(error)
    }
  })

router.post("/",
  validatorHandler(createProductDto, "body"),
  (req, res) => {
    const body = req.body;

    const newProduct = service.create(body);
    res.status(201).json(newProduct)
  })

router.put("/:id",
  validatorHandler(getProductDto, 'params'),
  validatorHandler(updateProductDto, 'body'),
  (req, res, next) => {
    try {
      let producto = {
        name: "producto sin actualizar",
        price: 15200
      }
      producto = req.body;
      res.json({
        message: "update",
        data: producto
      })

    } catch (error) {
      next(error)
    }

  })
router.patch("/:id",
  validatorHandler(getProductDto, "params"),
  validatorHandler(updateProductDto, "body"),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = service.update(id, body);
      res.json(product)

    } catch (error) {
      next(error)
    }

  })

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const result = service.delete(id);
    res.json(result)
  } catch (error) {
    next(error)
  }
})



module.exports = router
