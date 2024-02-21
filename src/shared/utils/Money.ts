import { Locale } from '../../infra/services/Locale'

const Money = {
  toLocale (value: number) {
    return value.toLocaleString(Locale.current(), {
      style: 'currency',
      currency: Locale.currency()
    })
  }
}

export { Money }
