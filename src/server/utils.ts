import { readFile, readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { SuggestChainData } from '~/lib/types'

export const getChainsData = async () => {
  let fileUrl = import.meta.url
  if (fileUrl.startsWith('file://')) {
    fileUrl = fileUrl.slice(7)
  }
  const fileDir = dirname(fileUrl)
  const dirPath = join(fileDir, '../../data/chain-store')
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
