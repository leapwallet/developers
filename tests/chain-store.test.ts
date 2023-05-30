import { readFile, readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { describe, it, expect } from 'vitest'
import { SuggestChainData } from '~/lib/types'
import { SuggestChainDataValidator } from '~/validators/chain-store'

const getChainData = async () => {
  let fileUrl = import.meta.url
  if (fileUrl.startsWith('file://')) {
    fileUrl = fileUrl.slice(7)
  }
  const fileDir = dirname(fileUrl)
  const dirPath = join(fileDir, '../data/chain-store')
  const dirData = await readdir(dirPath)
  const chainData: SuggestChainData[] = await Promise.all(
    dirData.map(async (file) => {
      const data = await readFile(join(dirPath, file), 'utf-8')
      return JSON.parse(data)
    })
  )

  return chainData
}

describe('validate chain store data', async () => {
  const chainData = await getChainData()

  if (chainData.length === 0) {
    it('should validate data for empty chain store', () => {
      console.warn('⚠️ WARNING: No chains data found for chain-store')
      expect(true).toBe(true)
    })
  }

  chainData.forEach((data) => {
    it(`should validate data for ${data.chainId}`, () => {
      const validationResult = SuggestChainDataValidator.safeParse(data)
      // print out the error message if validation fails
      if (!validationResult.success) {
        console.error(JSON.stringify(validationResult.error, null, 2))
      }
      // test case - validation should pass
      expect(validationResult.success).toBe(true)
    })
  })
})
