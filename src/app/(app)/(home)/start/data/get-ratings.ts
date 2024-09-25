import { api } from '@/app/lib/axios'

type GetRatingsResponse = {
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
    user: {
      id: string
      name: string
      avatarUrl: string | null
    }
  }[]
}

export async function getRatings() {
  const { data } = await api.get<GetRatingsResponse>('/ratings')

  return data
}
