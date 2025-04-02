/**
 * Environment configuration for Sanity Studio
 * All environment variables must be prefixed with SANITY_STUDIO_
 */

type EnvironmentKeys = 'projectId' | 'dataset' | 'apiVersion'

type EnvVar = {
  value: string | undefined
  required: boolean
  validate?: (value: string) => boolean
}

const envVars: Record<EnvironmentKeys, EnvVar> = {
  projectId: {
    value: process.env.SANITY_STUDIO_PROJECT_ID,
    required: true,
    // Project IDs are lowercase alphanumeric
    validate: (value) => /^[a-z0-9]+$/.test(value), 
  },
  dataset: {
    value: process.env.SANITY_STUDIO_DATASET,
    required: true,
     // Dataset names can contain hyphens and underscores
    validate: (value) => /^[a-z0-9_-]+$/.test(value),
  },
  apiVersion: {
    value: process.env.SANITY_STUDIO_API_VERSION,
    required: true,
     // YYYY-MM-DD format
    validate: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
  },
}

const validateEnvVars = Object.entries(envVars).reduce((errors: string[], [key, config]) => {
  const {value, required, validate} = config as EnvVar
  
  if (required && !value) {
    errors.push(`Missing required environment variable: SANITY_STUDIO_${key.toUpperCase()}`)
  }
  if (value && validate && !validate(value)) {
    errors.push(`Invalid format for environment variable: SANITY_STUDIO_${key.toUpperCase()}`)
  }
  
  return errors
}, [])

if (validateEnvVars.length > 0) {
  throw new Error(validateEnvVars.join('\n'))
}

export const environment = {
  projectId: envVars.projectId.value!,
  dataset: envVars.dataset.value!,
  apiVersion: envVars.apiVersion.value!,
} as const

export type Environment = typeof environment 