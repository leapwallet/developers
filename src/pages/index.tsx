import Head from 'next/head'
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
      <StandardLayout>
        <div className="flex justify-center items-center py-5 pb-4 border-b">
          <p className="text-gray-900 text-center text-lg font-bold">
            Generate Deep Link
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-gray-900 font-medium">
                dApp URL
              </label>
              <input
                type="url"
                name="url"
                id="url"
                value={urlInput}
                onChange={(event) => {
                  if (generatorState === 'success') {
                    setGeneratorState('idle')
                    setDeepLink(null)
                    setUrlInputHelper(null)
                  }
                  setUrlInput(event.target.value)
                  if (urlInputHelper !== null) {
                    setUrlInputHelper(null)
                  }
                }}
                className="border border-gray-500 rounded-lg p-2"
                placeholder="https://uniswap.exchange"
              />
              {urlInputHelper ? (
                <p
                  className={`text-sm font-medium ${
                    urlInputHelper.type === 'error'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {urlInputHelper.message}
                </p>
              ) : null}
            </div>
            {generatorState === 'success' && deepLink !== null ? (
              <div className="flex flex-col items-center justify-center mt-4">
                <QrCode
                  width={200}
                  height={200}
                  data={deepLink}
                  downloadConfig={{
                    elementID: downloadButtonID,
                    fileName: `leap-deep-link-${new URL(urlInput).hostname}`
                  }}
                />
                <p
                  className="text-gray-900 font-bold cursor-pointer mt-4 max-w-full overflow-hidden text-ellipsis"
                  onClick={copyLinkToClipboard}
                >
                  {deepLink}
                </p>
                <p className="text-gray-500 text-sm font-medium mt-2">
                  (Scan QR code or Click the Link to copy)
                </p>
              </div>
            ) : null}
            {generatorState === 'success' && deepLink !== null ? (
              <div className="flex flex-col gap-2">
                <button
                  className="bg-gray-900 text-white rounded-full p-2 mt-2"
                  onClick={copyLinkToClipboard}
                >
                  Copy Link
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    id={downloadButtonID}
                    className="bg-white flex-1 text-gray-900 border border-gray-900 rounded-full p-2"
                  >
                    Download QR Code
                  </button>
                  <button
                    className="bg-white flex-1 text-gray-900 border border-gray-900 rounded-full p-2"
                    onClick={resetForm}
                  >
                    Generate New Link
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-gray-900 text-white rounded-full p-2 disabled:bg-gray-700"
                onClick={handleRequestDeepLink}
                disabled={generatorState === 'loading'}
              >
                {generatorState === 'loading' ? (
                  <Spinner theme="dark" />
                ) : (
                  'Generate'
                )}
              </button>
            )}
          </div>
        </div>
      </StandardLayout>
    </>
  )
}
