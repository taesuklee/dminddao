'use client'

import { Header } from '@/components/Header/Header'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAddress } from '@/store/marketplaceSlice'
import {
  checkIfWalletConnected,
  connectToSmartContract,
} from '@/utils/wallet/walletConnector'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  const userName = useAppSelector((state) => state.authReducer.userName)
  const address = useAppSelector((state) => state.marketplaceReducer.address)
  const dispatch = useAppDispatch()

  const connectToWallet = async () => {
    const accounts = await checkIfWalletConnected()

    accounts && dispatch(setAddress(accounts[0]))
  }

  useEffect(() => {
    connectToWallet()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{userName}</h1>
        <h1>{address}</h1>
      </div>
    </main>
  )
}
