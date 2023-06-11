'use client'

import { store } from './store'
import { Provider } from 'react-redux'
import { checkIfWalletConnected } from '@/utils/wallet/walletConnector'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
