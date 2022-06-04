/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { ReactNode } from 'react'
import { ConnectWallet } from './ConnectWallet'
import { classNames } from './utils'

const navigation = [
  { name: 'Posts', href: '#', current: true, pageId: 0 },
  { name: 'New Post', href: '#', current: false, pageId: 1 }
]

export function Layout({
  children,
  setPage,
  pageId
}: {
  children: ReactNode
  setPage: (page: number) => void
  pageId: number
}) {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="hidden block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => {
                      const isSelected = item.pageId === pageId
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setPage(item.pageId)}
                          className={classNames(
                            isSelected
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={isSelected ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      )
                    })}
                  </div>
                </div>
                <div className=" sm:ml-6 sm:flex sm:items-center">
                  <ConnectWallet />
                </div>
              </div>
            </div>
          </>
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
