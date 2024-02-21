import { type TCurrency } from '../shared/types/Transactions'

const Locale = {
  current (): string {
    return 'pt-BR'
  },
  currency (): TCurrency {
    return 'BRL'
  }
}

export { Locale }
