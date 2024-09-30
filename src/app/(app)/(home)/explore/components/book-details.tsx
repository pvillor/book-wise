import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { BookmarkSimple, BookOpen, Star, StarHalf, X } from 'phosphor-react'
import { useQuery } from 'react-query'

import { getBook } from '../data/get-book'
import { BookRating } from './book-rating'
import { RateBook } from './rate-book'

interface BookDetailsProps {
  handleCloseBookRatingDialog: () => void
}

export function BookDetails({ handleCloseBookRatingDialog }: BookDetailsProps) {
  const searchParams = useSearchParams()
  const bookId = searchParams.get('bookId')?.toLowerCase()

  const { data } = useQuery({
    queryKey: ['book-details', bookId],
    queryFn: () => getBook(bookId ?? ''),
  })

  if (!data?.book) {
    return null
  }

  const totalRatings = data.book.ratings.length
  const bookRating =
    totalRatings > 0
      ? data.book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
        totalRatings
      : 0

  const fullStars = Math.floor(bookRating)
  const hasHalfStar = bookRating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const bookCategories = data.book.categories.map(
    ({ category }) => category.name,
  )

  const formattedBookCategories = bookCategories?.join(', ')

  return (
    <div className="fixed inset-0">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleCloseBookRatingDialog}
      />
      <div className="fixed top-0 right-0 h-screen overflow-y-auto w-[660px] bg-gray-800 py-16 px-12">
        <button
          className="absolute top-6 right-12"
          onClick={handleCloseBookRatingDialog}
        >
          <X size={24} className="text-gray-400" />
        </button>

        <div className="py-4 px-8 space-y-10 bg-gray-700 rounded-lg">
          <div className="flex gap-8">
            <Image
              src={data.book.coverUrl ?? ''}
              alt=""
              width={172}
              height={242}
              className="w-auto rounded-[10px]"
            />

            <div className="space-y-4">
              <div className="h-full flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-100 text-lg leading-snug font-semibold">
                    {data.book.name}
                  </h4>
                  <span className="text-gray-300 leading-relaxed">
                    {data.book.author}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    {Array.from({ length: fullStars }, (_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className="text-purple-100"
                        weight="fill"
                      />
                    ))}

                    {hasHalfStar && (
                      <StarHalf
                        size={16}
                        className="text-purple-100"
                        weight="fill"
                      />
                    )}

                    {Array.from({ length: emptyStars }, (_, index) => (
                      <Star
                        key={index + fullStars + 1}
                        size={16}
                        className="text-purple-100"
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm leading-relaxed">
                    {data.book.ratings.length} avaliações
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ul className="py-6 w-full flex items-center gap-14 border-t border-t-gray-600">
            <li className="flex items-center gap-5">
              <BookmarkSimple size={32} className="text-green-100" />
              <div>
                <span className="text-gray-300 text-sm leading-relaxed">
                  Categoria
                </span>
                <h4 className="text-gray-100 leading-snug font-semibold lowercase first-letter:uppercase">
                  {formattedBookCategories}
                </h4>
              </div>
            </li>
            <li className="flex items-center gap-5">
              <BookOpen size={32} className="text-green-100" />
              <div>
                <span className="text-gray-300 text-sm leading-relaxed">
                  Páginas
                </span>
                <h4 className="text-gray-100 leading-snug font-semibold">
                  {data.book.totalPages}
                </h4>
              </div>
            </li>
          </ul>
        </div>

        <RateBook />

        <div className="flex flex-col gap-3">
          {data.book.ratings.map((rating) => (
            <BookRating key={rating.id} rating={rating} />
          ))}
        </div>
      </div>
    </div>
  )
}
