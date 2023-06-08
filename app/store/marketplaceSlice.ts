'use client'

import { Marketplace } from '../../typechain-types/contracts/Marketplace'
import { createSlice } from '@reduxjs/toolkit'

export interface MarketPlaceState {
  address: string | null
  abi: any
}

const initialState: MarketPlaceState = {
  address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  abi: null,
}

export const marketplaceSlice = createSlice({
  name: 'Marketplace',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setABI: (state, action) => {
      state.abi = action.payload
    },
  },
})

export const { setAddress, setABI } = marketplaceSlice.actions
export default marketplaceSlice.reducer
