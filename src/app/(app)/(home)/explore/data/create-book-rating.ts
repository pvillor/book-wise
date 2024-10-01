import { api } from '@/app/lib/axios'

interface CreateBookRatingRequest {
  description: string
  rate: number
  bookId: string
}

export async function createBookRating({
  description,
  rate,
  bookId,
}: CreateBookRatingRequest) {
  return await api.post(`ratings/${bookId}`, {
    description,
    rate,
  })
}
