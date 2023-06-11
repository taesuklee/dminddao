import { ethers, Signer } from 'ethers'
import Web3Modal from 'web3modal'
import { Provider } from '@ethersproject/abstract-provider'
import { marketPlaceABI, marketPlaceAddress } from './constants'

export const fetchContract = (signerOrProvider: Signer | Provider) =>
  new ethers.Contract(marketPlaceAddress, marketPlaceABI, signerOrProvider)

export const connectToSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = fetchContract(signer)

    return contract
  } catch (err: any) {
    console.error(
      `Error occured while connecting to Smart Contract: ${err?.message}`
    )
  }
}

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log('Install metamask')

    const accounts: string[] = await window.ethereum.request({
      method: 'eth_accounts',
    })

    return accounts
  } catch (err: any) {
    console.error(
      `Error occured while connecting to Smart Contract ${err?.message}`
    )
  }
}
