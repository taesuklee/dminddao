'use client'

import { Header } from '@/components/Header/Header'
import { useAppSelector } from '@/store/hooks'
import { fetchNFTs } from '@/utils/wallet/nftTrader'
import {
  checkIfWalletConnected,
  connectToSmartContract,
} from '@/utils/wallet/walletConnector'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  const userName = useAppSelector((state) => state.authReducer.userName)
  const walletAddress = useAppSelector(
    (state) => state.marketplaceReducer.address
  )

  useEffect(() => {
    if (walletAddress) {
      fetchNFTs(walletAddress).then((items) => console.log('ITEMS', items))
    }
  }, [walletAddress])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{userName}</h1>
        <h1>{walletAddress}</h1>
      </div>
    </main>
  )
}
