import {defineCliConfig} from 'sanity/cli'
import {environment} from './environment'

export default defineCliConfig({
  api: {
    projectId: environment.projectId,
    dataset: environment.dataset
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
