const express = require("express")

const router = express.Router()

router.get("/", (req, res)=>{
  const categories = []

  res.json(categories)
})

module.exports = router
