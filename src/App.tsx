import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import 'easymde/dist/easymde.min.css'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import { Layout } from './components/Layout'
import { getEthersContracts } from './contractBooter'
import { initWeb3Onboard } from './onboard'
import type { Account } from './types'

// Must be called outside of the App function
initWeb3Onboard()

function App() {
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
  const [title, setTitle] = useState('')
  const [page, setPageRoute] = useState(1)

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  const [value, setValue] = useState('HAPPY MARKDOWN')

  const onChange = (value: string) => setValue(value)

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
    if (wallet?.provider) {
      setProvider(
        new ethers.providers.Web3Provider(wallet.provider, {
          name: 'dev',
          chainId: 31337
        })
      )
    }
  }, [wallet])

  const connectWallet = () => {
    connect({})
  }

  const setPage = (page: number) => {
    setPageRoute(page)
  }

  const disconnectWallet = () => {
    if (wallet?.label) {
      disconnect({ label: wallet?.label })
      setAccount(null)
    }
  }

  const sendTransaction = async () => {
    var contracts = getEthersContracts(provider)
    var signer = provider?.getUncheckedSigner(wallet?.accounts[0].address)
    if (wallet?.accounts[0].address && signer) {
      var contractWithSigner = contracts.publicationContract.connect(signer)
      console.log(contractWithSigner)
      await contractWithSigner.functions.post(value, title).catch((err: any) => console.log(err))
    }
  }

  return (
    <Layout setPage={setPage} pageId={page}>
      <div className="fixed w-full top-0 right-0 p-3 flex justify-end items-center">
        {/* {wallet ? (
          <Network
            chains={chains}
            connectedChain={connectedChain}
            setChain={(chainId) => setChain({ chainId })}
          />
        ) : null}
        <div className="mx-1" />
        <AccountDetails account={account} /> */}
      </div>
      <div className="my-32 text-3xl font-bold">hardhat-graph demo</div>
      <div className="my-32 text-3xl font-bold"> </div>
      {page == 1 ? (
        <>
          <div className="flex my-24">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  className="input input-bordered outline-none"
                  value={title}
                  placeholder="Title of post"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <SimpleMDE value={value} onChange={onChange} />;
                <button onClick={sendTransaction} className="btn btn-square">
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </Layout>
  )
}

export default App
