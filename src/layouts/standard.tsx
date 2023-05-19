import React, { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import LeapLogo from '~/assets/leap-logo.svg'
import LeapCosmos from '~/assets/leap-cosmos.svg'
import { frogJump } from '~/lib/utils'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
}

export const StandardLayout: React.FC<Props> = ({
  children,
  title,
  subtitle
}) => {
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      frogJump(e.target as HTMLImageElement)
    },
    []
  )

  return (
    <div
      className="grid grid-cols-1 min-h-screen"
      style={{
        gridTemplateRows: 'min-content 1fr min-content'
      }}
    >
      <header className="p-4 flex flex-col justify-start items-center">
        <Image
          width={40}
          src={LeapLogo}
          alt="Leap Logo"
          className="h-10 w-10 rounded-lg mt-8 sm:mt-16 md:mt-20"
          onClick={handleImageClick}
        />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 text-center">
          {title}
        </h1>
        <h2 className="text-gray-500 font-medium mt-1 sm:text-lg text-center px-10">
          {subtitle}
        </h2>
      </header>
      {children}
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
          <Link href="/" className="text-gray-600">
            Home
          </Link>
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
