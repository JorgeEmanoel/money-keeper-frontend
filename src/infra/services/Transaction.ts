import { type AxiosResponse } from 'axios'
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
  totalPending: number
  total: number
}

interface ListResponse {
  transactions: TTransaction[]
  totalPending: number
  total: number
}

export const Transaction = {
  outcoming: async (period: string): Promise<ListPayload> => await BaseAuthService().get(`/transactions/outcoming/${period}`).then((response: AxiosResponse<ListResponse>) => {
    return {
      ok: true,
      transactions: response.data.transactions,
      totalPending: response.data.totalPending,
      total: response.data.total
    }
  }).catch(err => {
    console.error('Failed to list outcoming Transaction: ', err)
    return {
      ok: false,
      transactions: [],
      totalPending: 0,
      total: 0
    }
  }),
  incoming: async (period: string): Promise<ListPayload> => await BaseAuthService().get(`/transactions/incoming/${period}`).then((response: AxiosResponse<ListResponse>) => {
    return {
      ok: true,
      transactions: response.data.transactions,
      total: response.data.total,
      totalPending: response.data.totalPending
    }
  }).catch(err => {
    console.error('Failed to list outcoming Transaction: ', err)
    return {
      ok: false,
      transactions: [],
      totalPending: 0,
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
