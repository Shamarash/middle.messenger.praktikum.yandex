export function debounce (callee: (...args: any[]) => string, timeoutMs: number) {
  return function perform (this: { lastCall: number, lastCallTimer: number }, ...args: any[]) {
    const previousCall = this.lastCall
    this.lastCall = Date.now()
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer)
    }
    // @ts-expect-error
    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
}
