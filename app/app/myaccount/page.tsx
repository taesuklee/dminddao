'use client'

import React, { useEffect, useState } from 'react'
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer'
import Upload from '@/components/Upload/Upload'
import { useAppSelector } from '@/store/hooks'
import { createSale, fetchNFTs } from '@/utils/wallet/nftTrader'
import { MarketItem, NFTstate } from '@/utils/types'
import { useRouter } from 'next/navigation'

const page = () => {
  const [myNFTs, setMyNFTs] = useState<null | MarketItem[]>(null)
  const [listedItems, setListedItems] = useState<null | MarketItem[]>(null)
  const [sellingPrice, setSellingPrice] = useState('')

  const router = useRouter()

  const walletAddress = useAppSelector(
    (state) => state.marketplaceReducer.address
  )

  useEffect(() => {
    if (walletAddress) {
      fetchNFTs(walletAddress, NFTstate.MINE).then((items) => {
        console.log('MINE', items)
        if (items) setMyNFTs(items)
      })

      fetchNFTs(walletAddress, NFTstate.LISTED).then((items) => {
        console.log('LISTED', items)
        if (items) setListedItems(items)
      })
    }
  }, [walletAddress])

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AudioPlayer />
        <Upload />
        <>
          <h1>My NFTs</h1>
          {myNFTs &&
            myNFTs.map((nft, i) => (
              <div key={i}>
                <label>Owner:</label>
                <h1>{nft.owner}</h1>
                <label>Seller:</label>
                <h1>{nft.seller}</h1>
                <label>Price: </label>
                <input
                  type="string"
                  onChange={(e) => setSellingPrice(e.target.value)}
                />
                <button
                  onClick={async () => {
                    await createSale(nft.tokenId.toString(), sellingPrice, true)
                    router.push('/')
                  }}>
                  Sell
                </button>
              </div>
            ))}
          <h1>My listed NFTs</h1>
          {listedItems &&
            listedItems.map((nft, i) => (
              <div key={i}>
                <label>Owner:</label>
                <h1>{nft.owner}</h1>
                <label>Seller:</label>
                <h1>{nft.seller}</h1>
              </div>
            ))}
        </>
      </div>
    </div>
  )
}

export default page
