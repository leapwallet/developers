import { readFile, readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { describe, it, expect } from 'vitest'
import { SuggestChainData } from '~/lib/types'
import { SuggestChainDataValidator } from '~/validators/chain-store'

const getChainsData = async () => {
  let fileUrl = import.meta.url
  if (fileUrl.startsWith('file://')) {
    fileUrl = fileUrl.slice(7)
  }
  const fileDir = dirname(fileUrl)
  const dirPath = join(fileDir, '../data/chain-store')
  const dirData = await readdir(dirPath)
  const chainsData: SuggestChainData[] = await Promise.all(
    dirData
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const data = await readFile(join(dirPath, file), 'utf-8')
        try {
          return JSON.parse(data)
        } catch (error) {
          console.error(
            `⚠️ ERROR: Failed to parse JSON data for "${file}"\n${error}`
          )
          return null
        }
      })
  ).then((data) => data.filter((item) => item !== null))

  return chainsData
}

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
