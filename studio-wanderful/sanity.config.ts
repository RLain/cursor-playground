import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {WanderfulSettings} from './secrets'

export default defineConfig({
  name: 'default',
  title: 'Wanderful',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION!,

  plugins: [
    structureTool(),
    visionTool(),
    {
      name: 'wanderful-secrets',
      tools: [
        {
          name: 'secrets',
          title: 'Configuration',
          component: WanderfulSettings,
        },
      ],
    },
  ],

  schema: {
    types: schemaTypes,
  },
})
