// eslint-disable-next-line @typescript-eslint/ban-types
type IListener = Record<string, Function[]>

export class EventBus {
  listeners: IListener = {}

  constructor () {
    this.listeners = {}
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  on (event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  off (event: string, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit (event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
