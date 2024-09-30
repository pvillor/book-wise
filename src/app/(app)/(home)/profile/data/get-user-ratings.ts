import { api } from '@/app/lib/axios'

type GetUserRatingsResponse = {
  ratings: {
    id: string
    rate: number
    description: string
    createdAt: Date
    book: {
      name: string
      author: string
      coverUrl: string
    }
  }[]
}

export async function getUserRatings(userId: string, q?: string) {
  const { data } = await api.get<GetUserRatingsResponse>(
    `/users/ratings/${userId}`,
    {
      params: {
        q,
      },
    },
  )

  return data
}
