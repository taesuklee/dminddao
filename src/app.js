require("dotenv").config()
const express = require("express")
const cors = require("cors")

const contractController = require("./controllers/contractController.js")
const bacalhauController = require("./controllers/bacalhauController.js")

const app = express()
app.use(cors({ origin: true }))

app.use("/contract", contractController)
app.use("/bacalhau", bacalhauController)

const port = 9000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
