import { api } from '@/app/lib/axios'

type GetBookResponse = {
  book: {
    id: string
    name: string
    author: string
    coverUrl: string
    totalPages: number
    categories: {
      category: {
        id: string
        name: string
      }
    }[]
    ratings: {
      id: string
      createdAt: Date
      rate: number
      description: string
      user: {
        name: string
        email: string
        avatarUrl: string
      }
    }[]
  }
}

export async function getBook(bookId: string) {
  const { data } = await api.get<GetBookResponse>(`/books/${bookId}`)

  return data
}
