/// <reference types="vite/client" />

// Remove unused environment variable type
interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}