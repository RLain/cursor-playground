import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {WanderfulSettings} from './secrets'
import {environment} from './environment'

export default defineConfig({
  name: 'default',
  title: 'Wanderful',

  projectId: environment.projectId,
  dataset: environment.dataset,
  apiVersion: environment.apiVersion,

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
