import Head from 'next/head'
import { ComingSoon } from '~/components/coming-soon'
import { StandardLayout } from '~/layouts/standard'

export default function ChainStore() {
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
        subtitle="Generate deep links for Leap's dApp Browser"
      >
        <main className="p-4 max-h-full">
          <ComingSoon />
        </main>
      </StandardLayout>
    </>
  )
}
