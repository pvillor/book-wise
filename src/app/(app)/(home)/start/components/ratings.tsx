import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Star, StarHalf } from 'phosphor-react'
import { useQuery } from 'react-query'

import { getRatings } from '../data/get-ratings'
import { UserLastRating } from './user-last-rating'

export function RatingsFeed() {
  const session = useSession()
  const router = useRouter()

  const isCurrentUserAuthenticated = session.status === 'authenticated'

  const { data } = useQuery({
    queryKey: ['ratings'],
    queryFn: getRatings,
  })

  function handleNavigateToUserProfile(userId: string) {
    router.push(`/profile/${userId}`)
  }

  return (
    <div className="flex flex-col gap-10">
      {isCurrentUserAuthenticated && <UserLastRating />}

      <div className="space-y-4">
        <h3 className="text-gray-100 text-sm leading-relaxed font-light">
          Avaliações mais recentes
        </h3>
        <div className="flex flex-col gap-3 pb-8">
          {data?.ratings.map((rating) => {
            const fullStars = Math.floor(rating.rate)
            const hasHalfStar = rating.rate - fullStars >= 0.5
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

            return (
              <div
                key={rating.id}
                className="p-6 space-y-8 bg-gray-700 rounded-lg border-[2px] border-transparent hover:border-gray-600 hover:cursor-pointer"
                onClick={() => handleNavigateToUserProfile(rating.user.id)}
              >
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <Image
                      src={rating.user.avatarUrl ?? ''}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
                    />
                    <div>
                      <h4 className="text-gray-100">{rating.user.name}</h4>
                      <span className="text-gray-400 text-sm">
                        {formatDistanceToNow(rating.createdAt, {
                          locale: ptBR,
                          addSuffix: true,
                        })}
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
                <div className="w-[560px] h-[152px] flex gap-5">
                  <Image
                    src={rating.book.coverUrl}
                    width={108}
                    height={152}
                    alt=""
                    className="rounded-[4px]"
                  />
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-gray-100 leading-snug font-semibold">
                        {rating.book.name}
                      </h4>
                      <span className="text-gray-400 text-sm leading-relaxed">
                        {rating.book.author}
                      </span>
                    </div>
                    {/* max 229 */}
                    <p className="text-gray-300 font-light text-sm line-clamp-4">
                      {rating.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
