export const LoginPattern: RegExp = /[A-Za-z](A-Za-z\d*|-*|_*)/gm
export const NamePattern: RegExp = /^[A-ZА-Я][a-zа-я]*[-]?[a-zа-я]*$/gm
export const PhonePattern: RegExp = /^\+?d+$/gm
export const PasswordPattern: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/gm
