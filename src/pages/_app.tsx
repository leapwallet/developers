import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'
import '~/styles/globals.css'

// fix for qr-code-styling dep
;(global as any).self = global

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </>
  )
}
