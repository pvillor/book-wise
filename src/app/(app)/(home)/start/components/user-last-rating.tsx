import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CaretRight, Star, StarHalf } from 'phosphor-react'
import { useQuery } from 'react-query'
import { z } from 'zod'

import { getLastUserRating } from '../data/get-last-user-rating'

const authenticatedUserSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().nullish(),
    image: z.string().nullish(),
  })
  .optional()

export function UserLastRating() {
  const session = useSession()
  const authenticatedUser = authenticatedUserSchema.parse(session.data?.user)

  const { data: lastUserRating } = useQuery({
    queryKey: ['users', 'ratings', authenticatedUser],
    queryFn: () => getLastUserRating(authenticatedUser?.id),
  })

  if (!lastUserRating) {
    return null
  }

  const fullStars = Math.floor(lastUserRating.rate)
  const hasHalfStar = lastUserRating.rate - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-gray-100 text-sm leading-relaxed font-light">
          Sua última leitura
        </h3>
        <Link
          href={`/profile/${authenticatedUser?.id}`}
          className="text-purple-100 text-sm font-bold flex items-center gap-2 py-1 px-2 rounded-[4px] hover:bg-gray-700"
        >
          Ver todas <CaretRight size={16} />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <div className="px-6 py-5 space-y-8 bg-gray-600 rounded-lg border-[2px] border-transparent">
          <div className="w-[560px] h-[152px] flex gap-6">
            <Image
              src={lastUserRating?.book.coverUrl ?? ''}
              alt=""
              width={108}
              height={152}
              className="rounded-[4px]"
            />

            <div className="space-y-3 flex-1">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">
                  {formatDistanceToNow(lastUserRating.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </span>

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

              <div className="space-y-6">
                <div>
                  <h4 className="text-gray-100 leading-snug font-semibold">
                    {lastUserRating?.book.name}
                  </h4>
                  <span className="text-gray-400 text-sm leading-relaxed">
                    {lastUserRating?.book.author}
                  </span>
                </div>
                {/* max 229 */}
                <p className="text-gray-300 font-light text-sm line-clamp-2">
                  {lastUserRating?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
