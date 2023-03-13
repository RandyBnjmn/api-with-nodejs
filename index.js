const express = require("express");
const routerApi = require("./routes");
const cors = require("cors")
const { logErrors, boomErrorHandler, errorHandler } = require("./middlewares/error.handler")
const app = express();
const port = 3000;

app.use(express.json())

const whiteList = ["http://localhost:8080"]
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true)
    }
    else {
      callback(new Error("No permitido"), false)
    }
  }
}
app.use(cors(options))
app.get("/", (req, res) => {
  res.send("Hola miserver in express")

})

routerApi(app)


app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)



app.listen(port, () => {
  console.log("Linsten in port 3000")
})


