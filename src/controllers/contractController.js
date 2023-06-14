const { Router } = require("express")
const { marketPlaceAddress } = require("../utils/constants.js")
const { ethers } = require("hardhat")
const { normalizeItems } = require("../helper/contractHelper.js")

const router = Router()

router.get("/all", async (req, res) => {
    try {
        const Marketplace = await ethers.getContractFactory("Marketplace")
        const marketplace = await Marketplace.attach(marketPlaceAddress)
        const data = await marketplace.fetchMarketItems()

        const items = await normalizeItems(data, marketplace)

        res.status(200).json({ items })
    } catch (error) {
        console.log("While fetching contract:", error)
        res.status(500)
    }
})

module.exports = router
