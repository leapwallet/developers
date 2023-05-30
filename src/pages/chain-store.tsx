import {
  ArrowSquareOut,
  Check,
  LinkBreak,
  MagnifyingGlass,
  Plus
} from '@phosphor-icons/react'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js'
import ChainImg from '~/assets/chain-image.svg'
import { PageBanner } from '~/components/page-banner'
import { StandardLayout } from '~/layouts/standard'
import { toast } from 'react-hot-toast'
import { GetStaticProps } from 'next'
import { readFile, readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { useChainsInWallet } from '~/hooks/use-chains-in-wallet'
import { DebouncedInput } from '~/components/debounced-input'
import { Toggle } from '~/components/toggle'
import { SuggestChainData } from '~/lib/types'
import { getChainsData } from '~/server/utils'

const leapWalletChromeStoreURL =
  'https://chrome.google.com/webstore/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg'

const TableHeader = () => (
  <div className="flex items-center w-full text-gray-500 font-medium">
    <p className="flex-[4] p-4 text-left">Chain</p>
    <p className="hidden sm:block flex-[2] p-4 text-left">Currency</p>
    <p className="hidden sm:block flex-[4] p-4 text-center">Node Provider</p>
    <p className="flex-[2] p-4 text-center">Status</p>
  </div>
)

const TableBody: React.FC<{
  chains: SuggestChainData[]
}> = ({ chains }) => {
  const chainsInWallet = useChainsInWallet()

  return (
    <div className="w-full">
      {chains.map((chain) => {
        const nodeURL = new URL(chain.rpc)
        const nodeOrigin = nodeURL.origin
        const nodeHostName = nodeURL.hostname
        const redirectUrl = `${nodeOrigin}/${chain.bech32Config.bech32PrefixAccAddr}`
        const nativeDenom = chain.stakeCurrency

        return (
          <div key={chain.chainId} className="flex items-center w-full">
            <div className="flex-[4] px-3 py-2 sm:px-4 sm:py-3 flex items-center">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative rounded-full overflow-hidden w-6 sm:w-8 md:w-9 h-6 sm:h-8 md:h-9 border">
                  <Image
                    alt="chain logo"
                    src={chain.image}
                    fill={true}
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = ChainImg.src
                      e.currentTarget.classList.add('bg-gray-100')
                      e.currentTarget.classList.add('p-1')
                      e.currentTarget.classList.add('border')
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base">
                    {chain.chainName}
                  </span>
                  <span className="sm:hidden text-xs text-gray-400">
                    {nativeDenom.coinDenom}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block flex-[2] px-3 py-2 sm:px-4 sm:py-3 text-left">
              <a
                href={`https://www.coingecko.com/en/coins/${nativeDenom.coinGeckoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400"
              >
                {nativeDenom.coinDenom}
              </a>
            </div>
            <div className="hidden sm:block flex-[4] px-3 py-2 sm:px-4 sm:py-3 text-xs font-mono">
              <div className="flex justify-center items-center gap-2">
                <a target="_blank" href={redirectUrl}>
                  {nodeHostName}
                </a>
                <ArrowSquareOut size={16} weight="bold" />
              </div>
            </div>
            <div className="flex-[2] px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center justify-center">
                {chainsInWallet[chain.bech32Config.bech32PrefixAccAddr] ? (
                  <div className="border-2 text-teal-500 bg-green-400/10 border-green-400/50 rounded-full flex items-center justify-center gap-1 w-20 sm:w-24 text-sm sm:text-base">
                    <Check size={16} weight="bold" />
                    <span>Added</span>
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      if (!window.leap) {
                        window.open(leapWalletChromeStoreURL, '_blank')
                        return
                      }
                      try {
                        await window.leap.experimentalSuggestChain(chain)
                      } catch (e) {
                        if (e instanceof Error) {
                          const message = e.message
                          toast.error(() => {
                            return (
                              <div className="flex flex-col">
                                <strong>Failed to Add Chain</strong>
                                <p className="text-sm">{message}</p>
                              </div>
                            )
                          })
                        } else {
                          toast.error('Failed to add chain')
                        }
                      }
                    }}
                    className="border-2 text-gray-500 bg-gray-400/10 border-gray-400/50 rounded-full flex items-center justify-center gap-1 w-20 sm:w-24 text-sm sm:text-base"
                  >
                    <Plus size={16} weight="bold" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const ChainsTable: React.FC<{ chains: SuggestChainData[] }> = ({ chains }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [hideActiveChains, setHideActiveChains] = useState(false)

  const fuse = useRef(
    new Fuse(chains, {
      keys: ['chainId', 'chainName']
    })
  )

  const chainsInWallet = useChainsInWallet()

  const chainsToShow = useMemo(() => {
    const queryResults = !searchQuery
      ? chains
      : fuse.current.search(searchQuery).map((result) => result.item)

    if (!hideActiveChains) {
      return queryResults
    }
    return queryResults.filter(
      (chain) => !chainsInWallet[chain.bech32Config.bech32PrefixAccAddr]
    )
  }, [searchQuery, chains, hideActiveChains, chainsInWallet])

  return (
    <>
      <div className="relative w-full max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 mt-2 w-full">
          <label htmlFor="search">
            <MagnifyingGlass size={20} weight="duotone" />
            <div className="sr-only">Search</div>
          </label>
          <DebouncedInput
            timeout={250}
            type="text"
            id="search"
            placeholder="Search for a chain"
            className="w-full sm:w-80 text-gray-900 bg-transparent outline-none border-b border-transparent focus:border-gray-800 transition-colors duration-200"
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <p className="whitespace-nowrap">Hide Active Chains</p>
          <Toggle checked={hideActiveChains} onChange={setHideActiveChains} />
        </div>
      </div>
      <div className="mt-4 relative w-full max-w-5xl mx-auto max-h-full rounded-xl bg-gradient-to-r from-fuchsia-400 via-blue-500 to-purple-500 p-[2px] glowy-bg">
        <div className="rounded-[10px] bg-white h-full overflow-y-auto">
          <div className="w-full sm:p-2">
            <TableHeader />
            <TableBody chains={chainsToShow} />
          </div>
          {chainsToShow.length == 0 ? (
            <div className="w-full flex flex-col justify-center items-center pt-6 pb-10 gap-2 text-gray-900">
              <LinkBreak weight="bold" size={32} />
              <p className="">No chains found</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default function ChainStore({ chains }: { chains: SuggestChainData[] }) {
  useEffect(() => {
    if (!window.leap) {
      const id = toast.error(
        () => {
          return (
            <div className="flex flex-col">
              <strong>Leap Wallet Not Detected</strong>
              <p className="text-sm">
                You can install it from{' '}
                <a
                  href={leapWalletChromeStoreURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 underline"
                >
                  here
                </a>
              </p>
            </div>
          )
        },
        {
          duration: Infinity
        }
      )
      return () => {
        toast.dismiss(id)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Chain Store | LeapWallet</title>
      </Head>
      <StandardLayout
        title={
          <>
            <span className="text-indigo-400">Chain</span>{' '}
            <span className="text-gray-900">Store</span>
          </>
        }
        subtitle="Keep Your Leap Wallet Updated with the Latest Chains"
      >
        <PageBanner>
          <p className="text-sm sm:text-base">
            🛠️ Developers looking to list a chain
            <a
              href="https://github.com/leapwallet/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              click here
            </a>
          </p>
        </PageBanner>
        <main className="px-4 sm:mt-6">
          <ChainsTable chains={chains} />
        </main>
      </StandardLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const chains = await getChainsData()

  return {
    props: {
      chains
    }
  }
}
