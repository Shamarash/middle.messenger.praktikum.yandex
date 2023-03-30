let timeout: number | undefined

function addMessage (message: string) {
  const alert = document.getElementById('alert')
  if (alert) {
    alert.classList.add('alertVisible')
    alert.textContent = message
  }
  timeout = window.setTimeout(function () {
    const alert = document.getElementById('alert')
    if (alert) {
      alert.classList.remove('alertVisible')
    }
  }, 5000)
}

export const setAlert = (message: string) => {
  console.log('message', message)
  clearTimeout(timeout)
  addMessage(message)
}
