import { ethers } from 'ethers'
import { connectToSmartContract, fetchContract } from './walletConnector'
import axios from 'axios'
import { localServer } from './constants'
import { MarketItem, NFTstate } from '../types'

export const createNFT = async (
  name: string,
  price: string,
  description: string,
  url: string
) => {
  console.log('CREATE NFT')
  if (!name || !price || !description || !url) {
    console.error('Data is missing')
  }

  const data = JSON.stringify({ name, description, url })

  try {
    // const added = await
    await createSale(url, price)
  } catch (error) {
    console.error(`Error while creating NFT: ${error}`)
  }
}

export const createSale = async (url: string, price: string) => {
  console.log('CREATE SALE')
  try {
    const ethPrice = ethers.utils.parseUnits(price, 'ether')
    const contract = await connectToSmartContract()

    const listingPrice = await contract?.getListingPrice()
    const transaction = await contract?.createToken(url, price, {
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
) => {
  try {
    if (currentAccount) {
      const provider = new ethers.providers.JsonRpcProvider()

      let contract: ethers.Contract | undefined
      let data: any
      switch (nftState) {
        case NFTstate.ALL:
          contract = fetchContract(provider)
          data = await contract.fetchMarketItems()
          break

        case NFTstate.LISTED:
          contract = await connectToSmartContract()
          data = await contract?.fetchItemsListed()
          break

        case NFTstate.MINE:
          contract = await connectToSmartContract()
          data = await contract?.fetchMyNFTs()
          break

        default:
          throw new Error(`Unknown NFT state: ${nftState}`)
          break
      }

      console.log('FETCH NFT', data)
      return data
      const items = await Promise.all(
        data.map(
          async ({
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
          }: {
            tokenId: any
            seller: string
            owner: string
            price: any
          }) => {
            console.log('DATA map')
            const tokenURI = await contract?.tokenURI(tokenId)

            console.log('tokenURI', tokenURI)

            //TODO axios 404
            // const {
            //   data: { image, name, description },
            // } = await axios.get(tokenURI)
            // const price = ethers.utils.formatUnits(
            //   unformattedPrice.toString(),
            //   'ether'
            // )

            // return {
            //   price,
            //   tokenId: tokenId.toNumber(),
            //   seller,
            //   owner,
            //   image,
            //   name,
            //   description,
            //   tokenURI,
            // }
          }
        )
      )
      // console.log(items)
      // return items
    }
  } catch (error) {
    console.error(`Error while fetching NFTS: ${error}.`)
  }
}

export const buyNFT = async (nft: MarketItem) => {
  try {
    const contract = await connectToSmartContract()
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    console.log(nft.price.toString(), price)

    const transaction = await contract?.createMarketSale(nft.tokenId, {
      value: nft.price,
    })

    await transaction.wait()
  } catch (error) {
    console.error(`Error while buying NFT: ${error}.`)
  }
}
