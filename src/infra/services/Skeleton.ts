import { BaseAuthService } from '../shared/services/BaseAuthService'
import { type TSkeleton } from '../shared/types/Skeletons'

interface NewSkeletonBody {
  name: string
  description: string
  frequency: 'monthly' | 'anual' | 'random'
  value: number
  currency: 'BRL' | 'USD'
  planId: number
  direction: 'income' | 'outcome'
}

interface NewSkeletonPayload {
  ok: boolean
}

interface ListPayload {
  ok: boolean
  skeletons: TSkeleton[]
}

interface ListResponse {
  data: {
    skeletons: TSkeleton[]
  }
}

export const Skeleton = {
  incoming: async (planId: number): Promise<ListPayload> => await BaseAuthService().get(`/plans/${planId}/skeletons/incoming`).then((response: ListResponse) => {
    let skeletons: TSkeleton[] = []

    if (response.data.skeletons.length > 0) {
      skeletons = response.data.skeletons
    }

    return {
      ok: true,
      skeletons
    }
  }).catch(err => {
    console.error('Failed to list incoming skeleton: ', err)
    return {
      ok: false,
      skeletons: []
    }
  }),
  outcoming: async (planId: number): Promise<ListPayload> => await BaseAuthService().get(`/plans/${planId}/skeletons/outcoming`).then((response: ListResponse) => {
    let skeletons: TSkeleton[] = []

    if (response.data.skeletons.length > 0) {
      skeletons = response.data.skeletons
    }

    return {
      ok: true,
      skeletons
    }
  }).catch(err => {
    console.error('Failed to list outcoming skeleton: ', err)
    return {
      ok: false,
      skeletons: []
    }
  }),
  create: async (body: NewSkeletonBody): Promise<NewSkeletonPayload> => await BaseAuthService().post(`/plans/${body.planId}/skeletons`, body).then(() => ({
    ok: true
  })).catch(err => {
    console.error('Failed to create skeleton: ', err)
    return {
      ok: false
    }
  })
}
