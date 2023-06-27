import React from 'react'
import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'
import '~/styles/globals.css'

// fix for qr-code-styling dep
// @ts-ignore
global.self = global

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </React.Fragment>
  )
}
