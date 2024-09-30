import { api } from '@/app/lib/axios'

type GetProfileResponse = {
  profile: {
    id: string
    name: string
    email?: string
    avatarUrl?: string
    createdAt: string
    ratings: {
      id: string
      rate: number
      description: string
      createdAt: string
      bookId: string
      userId: string
    }[]
  }
  books: {
    id: string
    name: string
    totalPages: number
    author: string
    categories: {
      category: {
        name: string
      }
    }[]
  }[]
}

export async function getProfile(userId: string) {
  const { data } = await api.get<GetProfileResponse>(`/users/profile/${userId}`)

  return data
}
