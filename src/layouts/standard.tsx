import React from 'react'
import Image from 'next/image'
import LeapLogo from '~/assets/leap-logo.svg'
import LeapCosmos from '~/assets/leap-cosmos.svg'

type Props = {
  children: React.ReactNode
}

export const StandardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="grid grid-cols-1 h-screen"
      style={{
        gridTemplateRows: 'min-content 1fr min-content'
      }}
    >
      <header className="p-4 flex flex-col justify-start items-center">
        <Image
          width={40}
          src={LeapLogo}
          alt="Leap Logo"
          className="h-10 w-10 rounded-lg mt-24"
        />
        <h1 className="text-4xl font-bold mt-4 text-center">
          <span className="text-indigo-400">Deep Link</span>{' '}
          <span className="text-gray-900">Generator</span>
        </h1>
        <h2 className="text-gray-500 font-medium mt-1 text-lg text-center">
          Generate deep links for Leap&apos;s dApp Browser
        </h2>
      </header>
      <main className="p-4">
        <div className="relative max-w-xl mx-auto max-h-full rounded-xl bg-gradient-to-r from-fuchsia-400 via-blue-500 to-purple-500 p-[2px] glowy-bg">
          <div className="rounded-[10px] bg-white h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
      <footer className="px-8 py-6 flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-4">
        <a
          className="flex items-center gap-2"
          href="https://leapwallet.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width={60} src={LeapCosmos} alt="Leap Cosmos" />
          <p className="text-gray-600 text-center">Powered by Leap Wallet</p>
        </a>
        <div className="flex gap-6">
          <a
            href="http://leapwallet.io/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            Terms
          </a>
          <a
            href="http://leapwallet.io/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            Privacy
          </a>
        </div>
      </footer>
    </div>
  )
}
