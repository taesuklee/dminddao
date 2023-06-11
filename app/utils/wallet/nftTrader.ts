import { ethers } from 'ethers'
import { connectToSmartContract, fetchContract } from './walletConnector'
import axios from 'axios'
import { localServer } from './constants'

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
  onlyMine: boolean = false
) => {
  try {
    if (currentAccount) {
      const provider = new ethers.providers.JsonRpcProvider()

      let contract: ethers.Contract | undefined
      let data: any
      if (!onlyMine) {
        contract = fetchContract(provider)
        data = await contract.fetchMarketItems()
      } else {
        contract = await connectToSmartContract()
        data = await contract?.fetchMyNFTs()
      }

      console.log('FETCH NFT', data)
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
