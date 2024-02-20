import { BaseAuthService } from '../shared/services/BaseAuthService'
import { type TSkeleton } from '../shared/types/Skeletons'

interface NewSkeletonBody {
  name: string
  description: string
  frequency: 'monthly' | 'anual' | 'random'
  value: string
  currency: 'BRL' | 'USD'
  planId: number
  direction: 'income' | 'outcome'
}

interface NewSkeletonPayload {
  ok: boolean
}

interface DeleteSkeletonPayload {
  ok: boolean
}

interface ListPayload {
  ok: boolean
  skeletons: TSkeleton[]
  total: number
}

interface ListResponse {
  data: {
    skeletons?: TSkeleton[]
    total: number
  }
}

export const Skeleton = {
  incoming: async (planId: number): Promise<ListPayload> => await BaseAuthService().get(`/plans/${planId}/skeletons/incoming`).then((response: ListResponse) => {
    let skeletons: TSkeleton[] = []

    if (response.data.skeletons !== null && typeof response.data.skeletons !== 'undefined' && response.data.skeletons.length > 0) {
      skeletons = response.data.skeletons
    }

    return {
      ok: true,
      skeletons,
      total: response.data.total
    }
  }).catch(err => {
    console.error('Failed to list incoming skeleton: ', err)
    return {
      ok: false,
      skeletons: [],
      total: 0
    }
  }),
  outcoming: async (planId: number): Promise<ListPayload> => await BaseAuthService().get(`/plans/${planId}/skeletons/outcoming`).then((response: ListResponse) => {
    let skeletons: TSkeleton[] = []

    if (response.data.skeletons !== null && typeof response.data.skeletons !== 'undefined' && response.data.skeletons.length > 0) {
      skeletons = response.data.skeletons
    }

    return {
      ok: true,
      skeletons,
      total: response.data.total
    }
  }).catch(err => {
    console.error('Failed to list outcoming skeleton: ', err)
    return {
      ok: false,
      skeletons: [],
      total: 0
    }
  }),
  create: async (body: NewSkeletonBody): Promise<NewSkeletonPayload> => await BaseAuthService().post(`/plans/${body.planId}/skeletons`, body).then(() => ({
    ok: true
  })).catch(err => {
    console.error('Failed to create skeleton: ', err)
    return {
      ok: false
    }
  }),
  exclude: async (planId: number, id: number): Promise<DeleteSkeletonPayload> => await BaseAuthService().delete(`/plans/${planId}/skeletons/${id}`).then(() => ({
    ok: true
  })).catch(err => {
    console.error('Failed to delete skeleton: ', err)
    return {
      ok: false
    }
  })
}
