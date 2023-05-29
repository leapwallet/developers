import { useState, useEffect } from 'react'

export function useChainsInWallet() {
  const [chainsInWallet, setChainsInWallet] = useState<Record<string, boolean>>(
    {}
  )

  useEffect(() => {
    if (!window.leap) return
    window.leap
      .getSupportedChains()
      .then((chains) => {
        const supportedChainsObject: Record<string, boolean> = {}
        chains.forEach((chain) => {
          supportedChainsObject[chain] = true
        })
        setChainsInWallet(supportedChainsObject)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return chainsInWallet
}
