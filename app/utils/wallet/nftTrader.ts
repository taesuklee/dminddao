import { ethers } from "ethers"
import { connectToSmartContract, fetchContract } from "./walletConnector"
import { MarketItem, NFTstate } from "../types"
import axios from "axios"

export const createNFT = async (name: string, price: string, description: string, url: string) => {
    console.log("CREATE NFT")
    if (!name || !price || !description || !url) {
        console.error("Data is missing")
    }

    const data = JSON.stringify({ name, description, url })

    try {
        // const added = await
        await createSale(url, price, false)
    } catch (error) {
        console.error(`Error while creating NFT: ${error}`)
    }
}

export const createSale = async (ref: string, price: string, reselling: boolean) => {
    console.log("CREATE SALE", ref, price)
    try {
        const ethPrice = ethers.utils.parseUnits(price, "ether")
        const contract = await connectToSmartContract()

        const listingPrice = await contract?.getListingPrice()
        const transaction = !reselling
            ? await contract?.createToken(ref, ethPrice, {
                  value: listingPrice.toString(),
              })
            : await contract?.resellToken(ref, ethPrice, {
                  value: listingPrice.toString(),
              })

        await transaction.wait()
    } catch (error) {
        console.error(`Error while creating sale: ${error}`)
    }
}

export const fetchNFTs = async (
    currentAccount: string,
    nftState: NFTstate = NFTstate.ALL
): Promise<MarketItem[] | undefined> => {
    try {
        if (currentAccount) {
            const contract = await connectToSmartContract()

            switch (nftState) {
                case NFTstate.ALL:
                    let {
                        data: { items },
                    } = await axios.get("http://localhost:9000/contract/all")

                    return items
                    break

                case NFTstate.LISTED:
                    const listedItems = await contract?.fetchItemsListed()
                    return await normalizeItems(listedItems, contract)
                    break

                case NFTstate.MINE:
                    const myNFTs = await contract?.fetchMyNFTs()
                    return await normalizeItems(myNFTs, contract)
                    break

                default:
                    throw new Error(`Unknown NFT state: ${nftState}`)
                    break
            }
        }
    } catch (error) {
        console.error(`Error while fetching NFTS: ${error}.`)
    }
}

const normalizeItems = async (data: any[], contract: ethers.Contract | undefined) => {
    return await Promise.all(
        data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract?.tokenURI(tokenId)

            const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether")

            return {
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                price,
                // image,
                // name,
                // description,
                tokenURI,
            }
        })
    )
}

export const buyNFT = async (nft: MarketItem) => {
    try {
        const contract = await connectToSmartContract()
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether")
        console.log(nft.price.toString(), price)

        const transaction = await contract?.createMarketSale(nft.tokenId, {
            value: price,
        })

        await transaction.wait()
    } catch (error) {
        console.error(`Error while buying NFT: ${error}.`)
    }
}
