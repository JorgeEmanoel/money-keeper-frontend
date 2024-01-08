import { type AxiosResponse } from 'axios'
import { BaseAuthService } from '../shared/services/BaseAuthService'

interface SummaryPayload {
  totalIncomings: number
  totalOutcomings: number
  balance: number
}

interface SummaryResponse {
  totalIncomings: number
  totalOutcomings: number
  balance: number
}

export const Plan = {
  summary: async (reference: string): Promise<SummaryPayload> => await BaseAuthService().get(`/plans/summary/${reference}`).then((response: AxiosResponse<SummaryResponse>) => ({
    totalIncomings: response.data.totalIncomings,
    totalOutcomings: response.data.totalOutcomings,
    balance: response.data.balance
  })).catch(err => {
    console.error('Failed to fetch summary: ', err)
    return {
      totalIncomings: 0,
      totalOutcomings: 0,
      balance: 0
    }
  })
}
