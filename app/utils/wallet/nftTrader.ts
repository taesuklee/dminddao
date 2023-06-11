import { ethers } from 'ethers'
import { connectToSmartContract } from './walletConnector'

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

    console.log('CONTRACT', contract)
    const listingPrice = await contract?.getListingPrice()
    console.log('LISTING price', listingPrice, price)
    const transaction = await contract?.createToken(url, price, {
      value: listingPrice.toString(),
    })

    console.log('TRANSACTIONSSSS', transaction)
    await transaction.wait()
  } catch (error) {
    console.error(`Error while creating sale: ${error}`)
  }
}
