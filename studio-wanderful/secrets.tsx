import {useSecrets, SettingsView} from '@sanity/studio-secrets'
import {useEffect, useState} from 'react'

const namespace = 'wanderful'

export const secretsConfig = {
  namespace,
  keys: [
    {
      key: 'projectId',
      title: 'Sanity Project ID',
    },
    {
      key: 'dataset',
      title: 'Sanity Dataset',
    },
    {
      key: 'apiVersion',
      title: 'Sanity API Version',
    },
  ],
}

export const useWanderfulSecrets = () => {
  return useSecrets(namespace)
}

export const WanderfulSettings = () => {
  const {secrets} = useWanderfulSecrets()
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (!secrets) {
      setShowSettings(true)
    }
  }, [secrets])

  if (!showSettings) {
    return null
  }

  return (
    <SettingsView
      title="Wanderful Configuration"
      namespace={namespace}
      keys={secretsConfig.keys}
      onClose={() => setShowSettings(false)}
    />
  )
} 