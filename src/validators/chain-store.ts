import * as z from 'zod'

// Validator for Currency interface
export const CurrencyValidator = z.object({
  coinDenom: z.string(),
  coinMinimalDenom: z.string(),
  coinDecimals: z.number(),
  coinGeckoId: z.string()
})

// Validator for FeeCurrency interface
export const FeeCurrencyValidator = CurrencyValidator.extend({
  gasPriceStep: z.object({
    low: z.number(),
    average: z.number(),
    high: z.number()
  })
})

// Validator for Bech32Config interface
export const Bech32ConfigValidator = z.object({
  bech32PrefixAccAddr: z.string(),
  bech32PrefixAccPub: z.string(),
  bech32PrefixValAddr: z.string(),
  bech32PrefixValPub: z.string(),
  bech32PrefixConsAddr: z.string(),
  bech32PrefixConsPub: z.string()
})

// Validator for SuggestChainData interface
export const SuggestChainDataValidator = z.object({
  rpc: z.string(),
  rest: z.string(),
  rpcTest: z.string().optional(),
  restTest: z.string().optional(),
  chainId: z.string(),
  chainName: z.string(),
  stakeCurrency: CurrencyValidator,
  bip44: z.object({
    coinType: z.number()
  }),
  bech32Config: Bech32ConfigValidator,
  currencies: z.array(CurrencyValidator),
  feeCurrencies: z.array(FeeCurrencyValidator),
  features: z.array(z.string()).optional(),
  walletUrlForStaking: z.string().optional(),
  theme: z
    .object({
      primaryColor: z.string(),
      gradient: z.string()
    })
    .optional(),
  image: z.string()
})
