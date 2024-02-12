export const LOCAL_STORAGE_PERIOD_KEY = String(process.env.REACT_APP_LOCAL_STORAGE_PERIOD_KEY)

const Period = {
  current: () => {
    let localPeriod = localStorage.getItem(LOCAL_STORAGE_PERIOD_KEY)

    if (localPeriod == null) {
      const date = new Date()
      localPeriod = `${date.getFullYear()}-${date.getMonth()}`
      localStorage.setItem(LOCAL_STORAGE_PERIOD_KEY, localPeriod)
    }

    return localPeriod
  },
  setCurrent: (value: string) => {
    localStorage.setItem(LOCAL_STORAGE_PERIOD_KEY, value)
  }
}

export { Period }
