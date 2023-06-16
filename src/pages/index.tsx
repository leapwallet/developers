import { useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LeapLogo from '~/assets/leap-logo.svg'
import LeapCosmos from '~/assets/leap-cosmos.svg'
import { frogJump } from '~/lib/utils'
import { CaretRight, GithubLogo, Package } from '@phosphor-icons/react'

const OpenSourceLibraryCard: React.FC<{
  title: string
  description: string
  emoji: string
  githubLink: string
  packageLink: string
}> = ({ title, description, emoji, githubLink, packageLink }) => {
  return (
    <>
      <div className="flex flex-col flex-[1] rounded-2xl bg-gray-50/30 shadow-sm backdrop-blur-md border border-gray-200 p-5 feature group">
        <div className="flex items-start gap-4">
          <p className="text-4xl w-16 h-16 flex items-center justify-center border border-gray-200 rounded-xl bg-white/20 backdrop-blur-sm">
            {emoji}
          </p>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl sm:text-2xl text-gray-800 text-left">
              {title}
            </h3>
            <div className="flex items-center gap-1 mt-[2px]">
              <a
                title="Github Link"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-gray-200 rounded-lg bg-white/20 backdrop-blur-sm p-1"
              >
                <GithubLogo size={18} weight="thin" />
              </a>
              <a
                title="Product Link"
                href={packageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-gray-200 rounded-lg bg-white/20 backdrop-blur-sm p-1"
              >
                <Package size={18} weight="thin" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mt-4 text-left text-sm sm:text-base">
          {description}
        </p>
      </div>
    </>
  )
}

const ServiceCard: React.FC<{
  title: string
  description: string
  emoji: string
  link: string
}> = ({ title, description, emoji, link }) => {
  return (
    <div className="flex flex-col flex-[1] rounded-2xl bg-gray-50/30 shadow-sm backdrop-blur-md border border-gray-200 p-5 feature group">
      <div className="flex items-start gap-4">
        <p className="text-4xl w-16 h-16 flex items-center justify-center border border-gray-200 rounded-xl bg-white/20 backdrop-blur-sm">
          {emoji}
        </p>
        <div className="flex flex-col">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800 text-left">
            {title}
          </h3>
          <div className="flex items-center gap-1 mt-[2px]">
            <Link
              title="Github Link"
              href={link}
              className="text-sm pl-3 pr-2 flex items-center justify-center border border-gray-200 rounded-lg bg-white/20 backdrop-blur-sm p-1"
            >
              <span>Open</span>
              <CaretRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-4 text-left text-sm sm:text-base">
        {description}
      </p>
    </div>
  )
}

const openSourceCards = [
  {
    title: 'Fallback Flaooda',
    description:
      'Blockchain node fallback mechanism bundled into a simple js library.',
    image: '🍹',
    githubLink: 'https://github.com/leapwallet/fallback-flaooda',
    packageLink: 'https://www.npmjs.com/package/@leapwallet/fallback-flaooda'
  },
  {
    title: 'Name Matcha',
    description:
      'One-stop Cosmos domain name & address resolution for your dApp.',
    image: '🍵',
    githubLink: 'https://github.com/leapwallet/name-matcha',
    packageLink: 'https://www.npmjs.com/package/@leapwallet/name-matcha'
  },
  {
    title: 'Buffer Boba',
    description:
      'Easy to use protobuf decoding for the most common transaction types.',
    image: '🧋',
    githubLink: 'https://github.com/leapwallet/buffer-boba',
    packageLink: 'https://www.npmjs.com/package/@leapwallet/buffer-boba'
  }
]

const servicesCards = [
  {
    title: 'Notifications Webhook',
    description:
      'On-chain Cosmos events delivered right to your server. Goodbye polling!',
    image: '🔔',
    link: '/webhooks'
  },
  {
    title: 'Chain Store',
    description: 'Enable support for your Cosmos SDK chain on Leap wallet.',
    image: '⚛️',
    link: '/chain-store'
  },
  {
    title: 'Deeplink Generator',
    description:
      "Generate deeplinks that open your dapp in Leap's mobile app browser.",
    image: '🔗',
    link: '/deeplink-generator'
  }
]

export default function Home() {
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      frogJump(e.target as HTMLImageElement)
    },
    []
  )

  return (
    <>
      <Head>
        <title>Developer Hub | LeapWallet</title>
      </Head>
      <div className="dotted-bg">
        <div className="glowy-img-bg">
          <div
            className="grid grid-cols-1 min-h-screen"
            style={{
              gridTemplateRows: 'min-content 1fr min-content'
            }}
          >
            <header className="p-4 flex flex-col justify-start items-center constraint-w">
              <Image
                width={40}
                src={LeapLogo}
                alt="Leap Logo"
                className="h-10 w-10 rounded-lg mt-12"
                onClick={handleImageClick}
              />
              <h1 className="text-3xl sm:text-4xl font-bold mt-2 text-center">
                <span className="text-indigo-400">LEAP</span>{' '}
                <span className="text-gray-900">DevHub</span>
              </h1>
              <h2 className="text-gray-500 font-medium mt-1 sm:text-lg text-center px-10 space-x-3">
                <span className="text-gray-800">Build</span>
                <span className="text-2xl text-gray-400">&middot;</span>
                <span className="text-gray-800">Ship</span>
                <span className="text-2xl text-gray-400">&middot;</span>
                <span className="text-gray-800">Scale</span>
              </h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/stroke.svg"
                alt="stroke"
                className="mt-2 pointer-events-none select-none"
              />
            </header>
            <main className="pt-12 sm:pt-8 pb-12 space-y-16 sm:space-y-12">
              <section id="services" className="relative constraint-w">
                <h2 className="font-bold text-2xl sm:text-3xl text-indigo-400">
                  Services
                </h2>
                <p className="mt-1 text-gray-700">
                  We built these to help you build better products!
                </p>
                <div className="flex flex-col md:flex-row w-full gap-3 mt-6 features">
                  {servicesCards.map((card) => (
                    <ServiceCard
                      key={card.title}
                      title={card.title}
                      description={card.description}
                      emoji={card.image}
                      link={card.link}
                    />
                  ))}
                </div>
              </section>
              <section id="open-source" className="relative constraint-w">
                <h2 className="font-bold text-2xl sm:text-3xl text-indigo-400">
                  Open Source
                </h2>
                <p className="mt-2 text-gray-700">
                  We built these so that you don&apos;t have to!
                </p>
                <div className="flex flex-col md:flex-row w-full gap-3 mt-6 features">
                  {openSourceCards.map((card) => (
                    <OpenSourceLibraryCard
                      key={card.title}
                      title={card.title}
                      description={card.description}
                      emoji={card.image}
                      githubLink={card.githubLink}
                      packageLink={card.packageLink}
                    />
                  ))}
                </div>
              </section>
            </main>
            <footer className="py-6 flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-4 constraint-w">
              <a
                className="flex items-center gap-2"
                href="https://leapwallet.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image width={60} src={LeapCosmos} alt="Leap Cosmos" />
                <p className="text-gray-600 text-center">
                  Powered by Leap Wallet
                </p>
              </a>
              <div className="flex gap-6">
                <Link
                  href="https://github.com/leapwallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600"
                >
                  GitHub
                </Link>
                <a
                  href="https://twitter.com/leap_cosmos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600"
                >
                  Twitter
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
