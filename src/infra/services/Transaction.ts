import { BaseAuthService } from '../shared/services/BaseAuthService'
import { type TStatus, type TTransaction } from '../shared/types/Transactions'

interface NewTransactionBody {
  name: string
  description: string
  status: TStatus
  value: number
  currency: 'BRL' | 'USD'
  direction: 'income' | 'outcome'
}

interface NewTransactionPayload {
  ok: boolean
}

interface DeleteTransactionPayload {
  ok: boolean
}

interface ListPayload {
  ok: boolean
  transactions: TTransaction[]
}

interface ListResponse {
  data: {
    transactions?: TTransaction[]
  }
}

export const Transaction = {
  outcoming: async (): Promise<ListPayload> => await BaseAuthService().get('/transactions/outcoming').then((response: ListResponse) => {
    let transactions: TTransaction[] = []

    if (response.data.transactions !== null && typeof response.data.transactions !== 'undefined' && response.data.transactions.length > 0) {
      transactions = response.data.transactions
    }

    return {
      ok: true,
      transactions
    }
  }).catch(err => {
    console.error('Failed to list outcoming Transaction: ', err)
    return {
      ok: false,
      transactions: [],
      total: 0
    }
  }),
  create: async (body: NewTransactionBody): Promise<NewTransactionPayload> => await BaseAuthService().post('/transactions', body).then(() => ({
    ok: true
  })).catch(err => {
    console.error('Failed to create Transaction: ', err)
    return {
      ok: false
    }
  }),
  exclude: async (planId: number, id: number): Promise<DeleteTransactionPayload> => await BaseAuthService().delete(`/plans/${planId}/transactions/${id}`).then(() => ({
    ok: true
  })).catch(err => {
    console.error('Failed to delete Transaction: ', err)
    return {
      ok: false
    }
  })
}
