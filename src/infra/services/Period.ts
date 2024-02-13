export const LOCAL_STORAGE_PERIOD_MONTH_KEY = String(process.env.REACT_APP_LOCAL_STORAGE_PERIOD_MONTH_KEY)
export const LOCAL_STORAGE_PERIOD_YEAR_KEY = String(process.env.REACT_APP_LOCAL_STORAGE_PERIOD_YEAR_KEY)

interface PeriodStructure {
  month: number
  year: number
  filterFormat: string
  displayFormat: string
}

const Period = {
  current (): PeriodStructure {
    const month = this.month()
    const year = this.year()

    const filterFormat = `${year}-${month}`
    const displayFormat = `${month}/${year}`.padStart(7, '0')

    return {
      month,
      year,
      filterFormat,
      displayFormat
    }
  },
  setCurrent (month: number, year: number): void {
    localStorage.setItem(LOCAL_STORAGE_PERIOD_MONTH_KEY, String(month))
    localStorage.setItem(LOCAL_STORAGE_PERIOD_YEAR_KEY, String(year))
  },
  month (): number {
    let month = Number(localStorage.getItem(LOCAL_STORAGE_PERIOD_MONTH_KEY))

    if (month === 0) {
      month = (new Date()).getMonth() + 1
      localStorage.setItem(LOCAL_STORAGE_PERIOD_MONTH_KEY, String(month))
    }

    return month
  },
  year (): number {
    let year = Number(localStorage.getItem(LOCAL_STORAGE_PERIOD_YEAR_KEY))

    if (year === 0) {
      year = (new Date()).getFullYear()
      localStorage.setItem(LOCAL_STORAGE_PERIOD_YEAR_KEY, String(year))
    }

    return year
  }
}

export { Period }
