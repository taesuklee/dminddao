export const createNFT = async (
  name: string,
  price: number,
  description: string,
  nft: any
) => {
  console.log('CREATE NFT')
  if (!name || !price || !description || !nft) {
    console.error('Data is missing')
  }

  const data = JSON.stringify({ name, description, nft })

  try {
    // const added = await
  } catch (error) {}
}
