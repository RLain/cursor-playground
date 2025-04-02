import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION

if (!projectId) throw new Error('Missing SANITY_PROJECT_ID')
if (!dataset) throw new Error('Missing SANITY_DATASET')
if (!apiVersion) throw new Error('Missing SANITY_API_VERSION')

export default defineConfig({
  name: 'default',
  title: 'Wanderful',

  projectId,
  dataset,
  apiVersion,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
