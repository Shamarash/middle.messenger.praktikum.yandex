import Store from './src/store'

export {}

declare global {
  module '*.hbs'
  module '*.png'
  interface Window {
    store: typeof Store
  }
}
