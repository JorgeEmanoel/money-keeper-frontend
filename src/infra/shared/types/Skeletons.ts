export type TDirection = 'income' | 'outcome'

export type TCurrency = 'BRL' | 'USD'

export type TFrequency = 'monthly' | 'anual' | 'random'

export interface TSkeleton {
  id: number
  name: string
  description: string
  value: number
  currency: TCurrency
  frequency: TFrequency
}
