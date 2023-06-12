import { SuggestChainData } from '~/lib/types'

declare global {
  interface Window {
    leap?: {
      version: string
      mode: string
      getSupportedChains: () => Promise<string[]>
      experimentalSuggestChain: (args: SuggestChainData) => Promise<void>
    }
  }
}

export {}
