const productRouter = require("./products.router")
const categoriesRouter = require('./cateegories.router')
const usersRouter = require("./users.router")
const express = require("express")

function routerApi(app){

  const router = express.Router()

  app.use("/api/v1", router)
  router.use("/products", productRouter)
  router.use("/categories", categoriesRouter)
  router.use("/users", usersRouter)


}

module.exports = routerApi

