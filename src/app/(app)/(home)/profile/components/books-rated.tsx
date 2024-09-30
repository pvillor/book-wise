'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Star, StarHalf } from 'phosphor-react'
import { useQuery } from 'react-query'

import { getUserRatings } from '../data/get-user-ratings'

interface BooksRatedProps {
  userId: string
}

export function BooksRated({ userId }: BooksRatedProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase()

  const { data: userRatings } = useQuery({
    queryKey: ['user-ratings', userId, query],
    queryFn: () => getUserRatings(userId, query ?? ''),
  })

  return (
    <div className="space-y-6">
      {userRatings?.ratings.map((rating) => {
        const fullStars = Math.floor(rating.rate)
        const hasHalfStar = rating.rate - fullStars >= 0.5
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

        return (
          <div key={rating.id} className="space-y-2">
            <span className="text-gray-400 text-sm">
              {formatDistanceToNow(rating.createdAt, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <div className="w-[624px] p-6 space-y-6 bg-gray-700 rounded-lg border-[2px] border-transparent">
              <div className="flex gap-6">
                <Image
                  src={rating.book.coverUrl}
                  width={98}
                  height={234}
                  alt=""
                  className="rounded-[4px]"
                />

                <div className="space-y-3">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-gray-100 leading-snug font-semibold text-lg">
                        {rating.book.name}
                      </h4>
                      <span className="text-gray-400 text-sm leading-relaxed">
                        {rating.book.author}
                      </span>
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
              <p className="text-gray-300 font-light text-sm line-clamp-2">
                {rating.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
