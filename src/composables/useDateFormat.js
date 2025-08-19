export function useDateFormat() {
  const format = (str) => {
    try {
      const d = new Date(str)
      const pad = (n) => String(n).padStart(2,'0')
      return `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
    } catch { return str }
  }
  return { format }
}
// backup