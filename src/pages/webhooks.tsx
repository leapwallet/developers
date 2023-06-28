import Head from 'next/head'
import { ComingSoon } from '~/components/coming-soon'
import { PageBanner } from '~/components/page-banner'
import { StandardLayout } from '~/layouts/standard'

export default function Webhooks() {
  return (
    <>
      <Head>
        <title>Notification Webhooks | LeapWallet</title>
      </Head>
      <StandardLayout
        title={
          <>
            <span className="text-indigo-400">Notification</span>{' '}
            <span className="text-gray-900">Webhooks</span>
          </>
        }
        subtitle="On-chain cosmos events delivered right to your server!"
      >
        <PageBanner>
          <p className="text-sm sm:text-base">
            ⚠️ We&apos;re migrating the app, you can find it
            <a
              href="https://developer.leapwallet.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              here
            </a>
          </p>
        </PageBanner>
        <main className="p-4 max-h-full">
          <ComingSoon />
        </main>
      </StandardLayout>
    </>
  )
}
