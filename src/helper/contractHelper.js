const { ethers } = require("hardhat")

exports.normalizeItems = async (data, contract) => {
    return await Promise.all(
        data.map(async ({ tokenId, seller, owner, price }) => {
            const tokenURI = await contract?.tokenURI(tokenId)
            const formatedPrice = ethers.utils.formatUnits(price.toString(), "ether")

            return {
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                formatedPrice,
                // image,
                // name,
                // description,
                tokenURI,
            }
        })
    )
}
