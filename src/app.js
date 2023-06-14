require("dotenv").config()
const express = require("express")
const cors = require("cors")

const contractController = require("./controllers/contractController.js")

const app = express()
app.use(cors({ origin: true }))

app.use("/contract", contractController)

const port = 9000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
