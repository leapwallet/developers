import { z } from 'zod'
import {
  CurrencyValidator,
  FeeCurrencyValidator,
  Bech32ConfigValidator,
  SuggestChainDataValidator
} from '~/validators/chain-store'

// TypeScript type for Currency interface
export type Currency = z.infer<typeof CurrencyValidator>

// TypeScript type for FeeCurrency interface
export type FeeCurrency = z.infer<typeof FeeCurrencyValidator>

// TypeScript type for Bech32Config interface
export type Bech32Config = z.infer<typeof Bech32ConfigValidator>

// TypeScript type for SuggestChainData interface
export type SuggestChainData = z.infer<typeof SuggestChainDataValidator>
