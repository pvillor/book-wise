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

export async function getUserRatings() {
  const { data } = await api.get<GetUserRatingsResponse>('/users/ratings')

  return data
}
