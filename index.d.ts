export {};

declare global {
    module '*.hbs'
    module '*.png'
    interface Window {
        selectedChatId: string | null
        profileState: string | null
    }
}