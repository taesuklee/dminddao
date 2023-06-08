import React, { useState, useEffect, useContext } from 'react'

import web3Modal from 'web3modal'
import { ethers } from 'ethers'

import { marketplaceAddress, marketplaceABI } from './constants'

export const MarketplaceContext = React.createContext()

export const MarketplaceProvider = ({ children }) => {
  return (
    <MarketplaceContext.Provider value={{}}>
      {children}
    </MarketplaceContext.Provider>
  )
}
