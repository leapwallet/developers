import { Atom, LinkSimple } from '@phosphor-icons/react'
import Head from 'next/head'
import Link from 'next/link'
import { StandardLayout } from '~/layouts/standard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Developer Hub | LeapWallet</title>
      </Head>
      <StandardLayout
        title={
          <>
            <span className="text-indigo-400">Leap</span>{' '}
            <span className="text-gray-900">Developer Hub</span>
          </>
        }
        subtitle="Creating a better cosmos blockchain experience"
      >
        <main className="p-4 max-h-full">
          <div className="relative max-w-xl mx-auto max-h-full rounded-xl bg-gradient-to-r from-fuchsia-400 via-blue-500 to-purple-500 p-[2px] glowy-bg">
            <div className="rounded-[10px] bg-white h-full overflow-y-auto">
              <div className="flex justify-center items-center py-5 pb-4 border-b">
                <h2 className="text-gray-900 text-center text-lg font-bold">
                  Quick Links
                </h2>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                <Link
                  className="group rounded-lg border border-gray-500 transition-all px-3 py-2 flex items-center gap-2 text-gray-900"
                  href="deeplink-generator"
                >
                  <LinkSimple
                    className="transition-colors group-hover:text-indigo-400"
                    size={20}
                  />
                  <p>Deep Link Generator</p>
                </Link>
                <Link
                  className="group rounded-lg border border-gray-500 transition-all px-3 py-2 flex items-center gap-2"
                  href="chain-store"
                >
                  <Atom
                    className="transition-colors group-hover:text-indigo-400"
                    size={20}
                  />
                  <p>Chain Store</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </StandardLayout>
    </>
  )
}
