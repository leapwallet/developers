import React, { useEffect, useRef } from 'react'

export const ComingSoon = () => {
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
    <div
      ref={ref}
      className="relative max-w-xl mx-auto max-h-full rounded-xl bg-gradient-to-r from-fuchsia-400 via-blue-500 to-purple-500 p-[2px] glowy-bg"
    >
      <div className="rounded-[10px] bg-white h-full overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center py-5 pb-4 border-b w-full">
            <h2 className="text-gray-900 text-center text-lg font-bold">
              Coming Soon
            </h2>
          </div>
          <div className="p-6 pt-4 w-full">
            <p className="text-gray-500 mt-2 text-center">
              We are building something awesome, check back soon!
            </p>
            <p className="text-gray-500 mt-1 text-center">
              You can follow us on{' '}
              <a
                href="https://twitter.com/leap_cosmos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Twitter
              </a>{' '}
              for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
