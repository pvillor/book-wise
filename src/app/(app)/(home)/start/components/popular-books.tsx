import Image from 'next/image'
import Link from 'next/link'
import { CaretRight, Star, StarHalf } from 'phosphor-react'
import { useQuery } from 'react-query'

import { getBooks } from '../../explore/data/get-books'

export function PopularBooks() {
  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks(''),
  })

  if (!data) {
    return null
  }

  const meanRatingsPerBook =
    data.books.reduce((acc, book) => acc + book.ratings.length, 0) /
    data.books.length

  const popularBooks = data.books.filter(
    (book) => book.ratings.length > meanRatingsPerBook,
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-gray-100 text-sm leading-relaxed font-light">
          Livros populares
        </h3>
        <Link
          href="/explore"
          className="text-purple-100 text-sm font-bold py-1 px-2 flex items-center gap-2 rounded-[4px] hover:bg-gray-700"
        >
          Ver todos <CaretRight size={16} />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {popularBooks.map((book) => {
          const totalRatings = book.ratings.length
          const bookRating =
            totalRatings > 0
              ? book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
                totalRatings
              : 0

          const fullStars = Math.floor(bookRating)
          const hasHalfStar = bookRating - fullStars >= 0.5
          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

          return (
            <div
              key={book.id}
              className="w-[324px] h-[130px] py-[18px] px-5 flex gap-5 bg-gray-700 rounded-lg border-[2px] border-transparent"
            >
              <Image
                src={book.coverUrl}
                width={64}
                height={94}
                alt=""
                className="h-full w-auto rounded-[4px]"
              />
              <div className="flex flex-col justify-between">
                <div className="space-y-5">
                  <div>
                    <h4 className="text-gray-100 leading-snug font-semibold line-clamp-2">
                      {book.name}
                    </h4>
                    <span className="text-gray-400 text-sm leading-relaxed">
                      {book.author}
                    </span>
                  </div>
                </div>
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
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
