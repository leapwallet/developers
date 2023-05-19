declare global {
  interface Window {
    leap: {
      version: string
      mode: string
      getSupportedChains: () => Promise<string[]>
      experimentalSuggestChain: () => Promise<void>
    }
  }
}

export {}
