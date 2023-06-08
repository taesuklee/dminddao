'use client'

import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  userName: string
}

const initialState: AuthState = {
  userName: 'No username',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeUserName: (state, action) => {
      state.userName = action.payload
    },
  },
})

export const { changeUserName } = authSlice.actions

export default authSlice.reducer
