import { type AxiosResponse } from 'axios'
import { BaseAuthService } from '../shared/services/BaseAuthService'
import { type TInitStatus } from '../shared/types/Plan'

interface SummaryPayload {
  totalIncomings: number
  totalOutcomings: number
  balance: number
  initStatus: TInitStatus
}

interface SummaryResponse {
  totalIncomings: number
  totalOutcomings: number
  balance: number
  initStatus: TInitStatus
}

interface InitPayload {
  ok: boolean
  message: string
}

interface InitResponse {
  message: string
}

export const Plan = {
  summary: async (reference: string): Promise<SummaryPayload> => await BaseAuthService().get(`/plans/summary/${reference}`).then((response: AxiosResponse<SummaryResponse>) => ({
    totalIncomings: response.data.totalIncomings,
    totalOutcomings: response.data.totalOutcomings,
    balance: response.data.balance,
    initStatus: response.data.initStatus
  })).catch(err => {
    console.error('Failed to fetch summary: ', err)
    return {
      totalIncomings: 0,
      totalOutcomings: 0,
      balance: 0,
      initStatus: 'pending'
    }
  }),
  init: async (reference: string): Promise<InitPayload> => await BaseAuthService().get(`/plans/init/${reference}`).then((response: AxiosResponse<InitResponse>) => ({
    ok: true,
    message: response.data.message
  })).catch(err => {
    console.error('Failed to fetch summary: ', err)
    return {
      ok: false,
      message: err.response.data.message
    }
  })
}
