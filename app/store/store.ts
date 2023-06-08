'use client'

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import marketplaceReducer from './marketplaceSlice'
import { createWrapper } from 'next-redux-wrapper'

export const store = configureStore({
  reducer: {
    authReducer,
    marketplaceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
