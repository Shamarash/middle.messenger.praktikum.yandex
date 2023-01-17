export {};

declare global {
    module '*.hbs'
    interface Window {
        selectedChatId: string | null
    }
}