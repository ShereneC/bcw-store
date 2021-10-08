import express from "express"
import bp from "body-parser"
import DbContext from "./db/dbconfig"
import ApparelController from "./controllers/ApparelController"
import ManufacturerController from "./controllers/ManufacturerController"
let server = express()
let port = 3000

DbContext.connect()

//NOTE register the middleware
server.use(bp.json());

//NOTE Register Routers Here
server.use('/api/apparel', new ApparelController().router);
server.use('/api/manufacturers', new ManufacturerController().router);

//NOTE: Default Error Handler
server.use((req, res, next) => {
  res.status(404).send("Route not Found")
})
server.use((err, req, res, next) => {
  console.log(err)
  res.status(400).send(err)
})

server.listen(port, () => {
  console.log("server running on port", port)
})