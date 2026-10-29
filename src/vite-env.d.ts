/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Client app origin, for local dev — see `.env.development` and lib/clientApp. */
  readonly VITE_CLIENT_APP_URL?: string
}
