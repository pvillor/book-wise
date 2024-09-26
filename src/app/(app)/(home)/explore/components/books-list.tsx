'use client'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Star, StarHalf } from 'phosphor-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { getBooks } from '../data/get-books'
import { BookDetails } from './book-details'

export function BooksList() {
  const [bookRatingsDialogOpened, setBookRatingsDialogOpened] = useState(false)

  const router = useRouter()

  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase()

  function handleOpenBookRatingDialog() {
    setBookRatingsDialogOpened(true)
  }

  function handleCloseBookRatingDialog() {
    setBookRatingsDialogOpened(false)
  }

  const { data } = useQuery({
    queryKey: ['books', query],
    queryFn: () => getBooks(query ?? ''),
  })

  function handleViewBookDetails(bookId: string) {
    router.push(`/explore?bookId=${bookId}`)
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {data?.books.map((book) => {
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
            className="flex flex-col gap-3 min-w-[318px]"
            onClick={() => handleViewBookDetails(book.id)}
          >
            <div
              className="py-4 px-5 flex gap-5 bg-gray-700 rounded-lg border-[2px] border-transparent hover:border-gray-600 hover:cursor-pointer"
              onClick={handleOpenBookRatingDialog}
            >
              <Image
                src={book.coverUrl}
                alt=""
                width={108}
                height={152}
                className="rounded-[4px]"
              />
              <div className="flex flex-col justify-between">
                <div className="space-y-5">
                  <div>
                    <h4 className="text-gray-100 leading-snug font-semibold">
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
          </div>
        )
      })}
      {bookRatingsDialogOpened && (
        <BookDetails
          handleCloseBookRatingDialog={handleCloseBookRatingDialog}
        />
      )}
    </div>
  )
}
