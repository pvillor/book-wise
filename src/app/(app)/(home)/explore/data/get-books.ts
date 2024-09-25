import { api } from '@/app/lib/axios'

type GetBooksResponse = {
  books: {
    id: string
    name: string
    author: string
    coverUrl: string
    ratings: {
      rate: number
    }[]
    categories: {
      category: {
        id: string
        name: string
      }
    }[]
  }[]
}

export async function getBooks(q?: string) {
  const { data } = await api.get<GetBooksResponse>('/books', {
    params: {
      q,
    },
  })

  return data
}
