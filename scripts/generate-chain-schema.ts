/**
 * This script generates a JSON schema from the SuggestChainDataValidator
 * and writes it to the generated folder.
 *
 * You can run the following command to generate the schema:
 *
 * npx tsx scripts/generate-chain-schema.ts
 *
 * Once generated, add the schema at the URL https://assets.leapwallet.io/dev/chain-store.schema.json
 * in assets s3 bucket.
 */
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { SuggestChainDataValidator } from '~/validators/chain-store'

const jsonSchema = zodToJsonSchema(SuggestChainDataValidator, 'chainSchema')

const jsonSchemaString = JSON.stringify(jsonSchema, null, 2)

const generatedDataFolder = resolve(__dirname, './generated')

// check if generated folder exists
// if not, create it
if (!existsSync(generatedDataFolder)) {
  mkdirSync(generatedDataFolder)
}

const schemaPath = resolve(__dirname, './generated/chain-store.schema.json')

writeFileSync(schemaPath, jsonSchemaString, 'utf-8')
