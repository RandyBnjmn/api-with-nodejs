const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {

 const users = [];
  res.json(users)
})


module.exports = router
