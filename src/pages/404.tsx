import { DiscordLogo, EnvelopeSimple } from '@phosphor-icons/react'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { StandardLayout } from '~/layouts/standard'

export default function NotFound() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.body.addEventListener('mousemove', (event) => {
      // transform the card based on mouse position
      const card = ref.current
      if (!card) return
      const cardRect = card.getBoundingClientRect()
      // get card center coords
      const cardCenterX = cardRect.left + cardRect.width / 2
      const cardCenterY = cardRect.top + cardRect.height / 2
      // get rotation values
      const cardRotateX = (event.clientY - cardCenterY) / 40
      const cardRotateY = (event.clientX - cardCenterX) / 40
      // apply rotation
      card.style.transform = `perspective(1000px) rotateX(${-cardRotateX}deg) rotateY(${cardRotateY}deg)`
    })
  }, [])

  return (
    <>
      <Head>
        <title>Not Found | LeapWallet</title>
      </Head>
      <StandardLayout
        title={
          <>
            <span className="text-indigo-400">404</span>{' '}
            <span className="text-gray-900">Not Found</span>
          </>
        }
        subtitle="The page you are looking for does not exist."
      >
        <div
          ref={ref}
          className="mt-8 relative max-w-xl mx-auto h-fit rounded-xl bg-gradient-to-r from-fuchsia-400 via-blue-500 to-purple-500 p-[2px] glowy-bg"
        >
          <div className="rounded-[10px] bg-white h-full overflow-y-auto">
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center items-center py-5 pb-4 border-b w-full">
                <h2 className="text-gray-900 text-center text-lg font-bold">
                  Oops 🙊
                </h2>
              </div>
              <div className="p-6 pt-4 w-full">
                <p className="text-gray-500 mt-2 flex items-end justify-center gap-2">
                  <span>
                    If you think this is a mistake, please contact us via
                  </span>
                  <a
                    href="https://discord.gg/HnEKPeRp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline flex items-center gap-1"
                  >
                    <DiscordLogo weight="bold" />
                    <span>Discord</span>
                  </a>
                </p>
                <p className="text-gray-500 mt-2 flex items-end justify-center gap-2">
                  <span>Alternatively, you can reach us at</span>
                  <a
                    href="mailto:admin@leapwallet.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline flex items-center gap-1"
                  >
                    <EnvelopeSimple weight="bold" />
                    <span>admin@leapwallet.io</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </StandardLayout>
    </>
  )
}
