export const LoginPattern = '^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\\d_-]{2,19}$'
export const NamePattern = '^(?=.*[A-Za-zА-Яа-яЁё]$)[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё_-]{1,}$'
export const PhonePattern = '^\\+?\\d{9,14}$'
export const PasswordPattern = '^(?=.*?[A-ZА-ЯЁ])(?=.*?[a-zа-яё])(?=.*?[0-9]).{8,40}$'
