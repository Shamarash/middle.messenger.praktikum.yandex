// eslint-disable-next-line no-useless-escape
export const LoginPattern = '/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d_-]{2,19}$/gm'
export const NamePattern = '/^(?=.*[A-Za-zА-Яа-яЁё]$)[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё_-]{1,}$/gm'
export const PhonePattern = '/^+?d+$/gm'
export const PasswordPattern = '/^(?=.*?[A-ZА-ЯЁ])(?=.*?[a-zа-яё])(?=.*?[0-9]).{8,40}$/gm'
