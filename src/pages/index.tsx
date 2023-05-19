import { Atom, LinkSimple, Storefront } from '@phosphor-icons/react'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import QrCode from '~/components/qr-code'
import { Spinner } from '~/components/spinner'
import { StandardLayout } from '~/layouts/standard'

type GeneratorState = 'idle' | 'loading' | 'success' | 'error'

type FormHelper = {
  message: string
  type: 'error' | 'info'
}

const downloadButtonID = 'download-qr-code-btn'

const validateUrl = (url: string): FormHelper => {
  const trimmedUrl = url.trim()
  if (!trimmedUrl) {
    return {
      message: 'URL is required',
      type: 'error'
    }
  }
  try {
    const url = new URL(trimmedUrl)
    if (url.protocol !== 'https:') {
      return {
        message: 'URL must start with https',
        type: 'error'
      }
    }
    return {
      message: 'Looks good',
      type: 'info'
    }
  } catch (error) {
    return {
      message: 'Invalid URL',
      type: 'error'
    }
  }
}

export default function Home() {
  const [generatorState, setGeneratorState] = useState<GeneratorState>('idle')

  const [urlInput, setUrlInput] = useState<string>('')
  const [urlInputHelper, setUrlInputHelper] = useState<FormHelper | null>(null)
  const [deepLink, setDeepLink] = useState<string | null>(null)

  const resetForm = useCallback(() => {
    setGeneratorState('idle')
    setDeepLink(null)
    setUrlInputHelper(null)
    setUrlInput('')
  }, [])

  const copyLinkToClipboard = useCallback(() => {
    if (!deepLink) return
    navigator.clipboard.writeText(deepLink)
    toast.success('Deep link copied to clipboard.')
  }, [deepLink])

  const handleRequestDeepLink = useCallback(async () => {
    const url = urlInput.trim()
    // 1. Validate URL
    const validationResult = validateUrl(url)
    if (validationResult.type === 'error') {
      setUrlInputHelper(validationResult)
      return
    } else {
      setUrlInputHelper(null)
    }
    // 2. Generate Deep Link
    setGeneratorState('loading')
    try {
      const response = await fetch(
        `https://api.leapwallet.io/deeplink?dapp-url=${encodeURIComponent(url)}`
      )
      if (response.ok) {
        const data: { shortLink: string } = await response.json()
        setGeneratorState('success')
        setDeepLink(data.shortLink)
        toast.success('Deep link generated successfully.')
      } else {
        const data: { reason: string } = await response.json()
        setGeneratorState('error')
        toast.error(`${data.reason}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to generate deep link, please try again.')
      }
      setGeneratorState('error')
    }
  }, [urlInput])

  return (
    <>
      <Head>
        <title>Deep Link Generator | LeapWallet.io</title>
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
