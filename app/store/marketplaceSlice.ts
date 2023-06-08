'use client'

import { createSlice } from '@reduxjs/toolkit'
export interface MarketPlaceState {
  address: string | null
  abi: string | null
}

const initialState: MarketPlaceState = {
  address: null,
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
