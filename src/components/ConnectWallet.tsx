import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Wallet } from 'tabler-icons-react'
import { Button } from './Button'
import { formatAddress } from './utils'

interface Account {
  address: string
  ens: { name?: string; avatar?: string }
  balance: Record<string, string> | null
}
// Must be called outside of the App function

export function ConnectWallet() {
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
      connecting // boolean indicating if connection is in progress
    },
    connect, // function to call to initiate user to connect wallet
    disconnect // function to call to with wallet<DisconnectOptions> to disconnect wallet
  ] = useConnectWallet()

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  // This hook allows you to track the state of all the currently connected wallets
  const connectedWallets = useWallets()

  // The user's currently connected account
  const [account, setAccount] = useState<Account | null>(null)

  // The address to send to
  const [toAddress, setToAddress] = useState('')

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  useEffect(() => {
    // If `wallet` is defined then the user is connected
    if (wallet) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    // setChain({ chainId: '0x1' })
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  const connectWallet = () => {
    console.log('CONNECTING')

    connect({})
  }

  const readyToTransact = async () => {
    if (!wallet) {
      const walletSelected = (await connect({})) as any
      if (!walletSelected) return false
    }
    // prompt user to switch to Rinkeby for test
    await setChain({ chainId: '0x4' })

    return true
  }

  const disconnectWallet = () => {
    if (wallet?.label) {
      disconnect({ label: wallet?.label })
      setAccount(null)
    }
  }

  return (
    <div>
      {account ? (
        <Button onClick={disconnectWallet} size="small">
          <span className="flex gap-2 items-center">
            <Wallet /> {formatAddress(account.address)}
          </span>
        </Button>
      ) : (
        <Button onClick={readyToTransact} size="small">
          <span className="flex gap-2 items-center">
            <Wallet /> Connect Wallet
          </span>
        </Button>
      )}
    </div>
  )
}
