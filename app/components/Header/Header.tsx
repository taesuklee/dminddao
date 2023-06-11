'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAddress } from '@/store/marketplaceSlice'
import {
  checkIfWalletConnected,
  connectToSmartContract,
} from '@/utils/wallet/walletConnector'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const Header = () => {
  const walletAddress = useAppSelector(
    (state) => state.marketplaceReducer.address
  )
  const dispatch = useAppDispatch()

  const [account, setAccount] = useState(walletAddress)

  useEffect(() => {
    setAccount(walletAddress)
  }, [walletAddress])

  const connectToWallet = async () => {
    if (!walletAddress) {
      await connectToSmartContract()

      const accounts = await checkIfWalletConnected()
      if (accounts && accounts[0]) {
        setAccount(accounts[0])
        dispatch(setAddress(accounts[0]))
      }
    } else {
      setAccount(walletAddress)
    }
  }

  return (
    <nav className="w-full h-40 flex items-center justify-between flex-wrap p-6 border-b border-dashed border-dark-secondary">
      <Link href={{ pathname: '/' }}>
        <button>Home</button>
      </Link>
      <Link href={{ pathname: 'myaccount' }}>
        <button>My account</button>
      </Link>
      {account ? (
        <button className="w-10 focus:ring-indigo-500 focus:border-indigo-500 pl-7 pr-20 mr-5 sm:text-sm border-gray-300 rounded-md">
          {account}
        </button>
      ) : (
        <button onClick={connectToWallet}>Connect</button>
      )}
    </nav>
  )
}
