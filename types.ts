declare global {
  interface SuggestChainData {
    chainId: string
    key: string
    chainName: string
    chainRegistryPath: string
    chainSymbolImageUrl: string
    txExplorer: {
      mainnet: {
        name: string
        txUrl: string
      }
    }
    apis: {
      rest: string
      rpc: string
    }
    denom: string
    bip44: {
      coinType: string
    }
    addressPrefix: string
    gasPriceStep: {
      low: number
      average: number
      high: number
    }
    nativeDenoms: Record<
      string,
      {
        coinDenom: string
        coinMinimalDenom: string
        coinDecimals: number
        coinGeckoId: string
        icon: string
        chain: string
      }
    >
    theme: {
      primaryColor: string
      gradient: string
    }
  }

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
