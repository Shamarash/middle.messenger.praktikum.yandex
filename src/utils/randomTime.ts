export const randomTime = (): string => {
    const hours = Math.floor(Math.random() * 24)
    const minutes = Math.floor(Math.random() * 60)

    return `${(hours < 10) ? ('0' + hours) : hours}:${(minutes < 10) ? ('0' + minutes) : minutes}`
}