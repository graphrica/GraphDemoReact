import { useConnectWallet } from '@web3-onboard/react'
import 'easymde/dist/easymde.min.css'
import { ethers } from 'ethers'
import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import { Button } from './components/Button'
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

  console.log(wallet?.accounts, '~~~wallet')
  return (
    <Layout setPage={setPage} pageId={page}>
      {page == 1 ? (
        <>
          <div className="mt-4">
            <input
              className="shadow-sm h-10 pl-2 mb-4 w-96 focus:ring-indigo-500 focus:border-indigo-500 block text-gray-900 sm:text-sm border-gray-300 rounded-md"
              type="text"
              value={title}
              placeholder="Title of post"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <SimpleMDE value={value} onChange={onChange} />
          <Button large={true} onClick={sendTransaction}>
            Send Post
          </Button>
        </>
      ) : (
        <></>
      )}
    </Layout>
  )
}

export default App
