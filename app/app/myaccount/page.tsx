'use client'

import React, { useEffect } from 'react'
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer'
import Upload from '@/components/Upload/Upload'
import { useAppSelector } from '@/store/hooks'
import { fetchNFTs } from '@/utils/wallet/nftTrader'

const page = () => {
  const walletAddress = useAppSelector(
    (state) => state.marketplaceReducer.address
  )
  useEffect(() => {
    if (walletAddress) {
      fetchNFTs(walletAddress, true).then((items) =>
        console.log('ITEMS', items)
      )
    }
  }, [walletAddress])

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AudioPlayer />
        <Upload />
      </div>
    </div>
  )
}

export default page
