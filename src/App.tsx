import { useConnectWallet } from '@web3-onboard/react'
import 'easymde/dist/easymde.min.css'
import { ethers } from 'ethers'
import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import { Layout } from './components/Layout'
import { getEthersContracts } from './contractBooter'
import { initWeb3Onboard } from './onboard'

// Must be called outside of the App function
initWeb3Onboard()

function App() {
  const [
    {
      wallet // the wallet that has been connected or null if not yet connected
    }
  ] = useConnectWallet()

  const [title, setTitle] = useState('')
  const [page, setPageRoute] = useState(1)

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  const [value, setValue] = useState('HAPPY MARKDOWN')

  const onChange = (value: string) => setValue(value)

  const setPage = (page: number) => {
    setPageRoute(page)
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
