import { describe, it, expect } from 'vitest'
import { getChainsData } from '~/server/utils'
import { SuggestChainDataValidator } from '~/validators/chain-store'

describe('validate chain store data', async () => {
  const chainsData = await getChainsData()

  if (chainsData.length === 0) {
    it('should validate data for empty chain store', () => {
      console.warn('⚠️ WARNING: No chains data found for chain-store')
      expect(true).toBe(true)
    })
  }

  chainsData.forEach((data) => {
    it(`should validate data for "${data.chainId}"`, () => {
      const validationResult = SuggestChainDataValidator.safeParse(data)
      // print out the error message if validation fails
      if (!validationResult.success) {
        console.error(
          `⚠️ VALIDATION ERROR:\n${JSON.stringify(
            validationResult.error.issues,
            null,
            2
          )}`
        )
      }
      // test case - validation should pass
      expect(validationResult.success).toBe(true)
    })
  })
})
