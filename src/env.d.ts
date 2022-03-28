/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_BASE_API: string
  VITE_BASE_URL_QINIU: string
  VITE_REPLY_NAME: string
  VITE_REPLY_IMGURL: string
  VITE_REPLY_LINK: string
  VITE_REPLY_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
