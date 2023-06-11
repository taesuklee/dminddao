import { ethers } from 'ethers'
import { connectToSmartContract, fetchContract } from './walletConnector'

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

export const fetchNFTs = async (currentAccount: string) => {
  console.log('FETCH NFTs')
  try {
    if (currentAccount) {
      const provider = new ethers.providers.JsonRpcProvider()
      const contract = fetchContract(provider)

      const data = await contract.fetchMarketItems()
      console.log('FETCH NFT', data)

      // const items = await Promise.all(
      //   data.map(
      //     async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      //       const tokenURI = await contract.tokenURI(tokenId)

      //       const {
      //         data: { image, name, description },
      //       } = await axios.get(tokenURI)
      //       const price = ethers.utils.formatUnits(
      //         unformattedPrice.toString(),
      //         'ether'
      //       )

      //       return {
      //         price,
      //         tokenId: tokenId.toNumber(),
      //         seller,
      //         owner,
      //         image,
      //         name,
      //         description,
      //         tokenURI,
      //       }
      //     }
      //   )
      // )

      // console.log(items)
      // return items
    }
  } catch (error) {
    console.error(`Error while fetching NFTS: ${error}.`)
  }
}
