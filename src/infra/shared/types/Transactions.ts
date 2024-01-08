export type TDirection = 'income' | 'outcome'

export type TCurrency = 'BRL' | 'USD'

export type TStatus = 'pending' | 'paid' | 'canceled'

export interface TTransaction {
  id: number
  name: string
  description: string
  value: number
  currency: TCurrency
  status: TStatus
}
