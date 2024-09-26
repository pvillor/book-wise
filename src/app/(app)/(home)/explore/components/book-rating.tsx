import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Star, StarHalf } from 'phosphor-react'

interface BookRatingProps {
  rating: {
    id: string
    createdAt: Date
    rate: number
    description: string
    user: {
      name: string
      email: string
      avatarUrl: string
    }
  }
}

export function BookRating({ rating }: BookRatingProps) {
  const session = useSession()

  const currentUser = session.data?.user

  if (!rating) {
    return null
  }

  const fullStars = Math.floor(rating.rate)
  const hasHalfStar = rating.rate - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div
      className={`p-6 flex flex-col gap-5 ${rating.user.email === currentUser?.email ? 'bg-gray-600' : 'bg-gray-700'} rounded-lg`}
    >
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <Image
            src={rating.user.avatarUrl}
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
            <StarHalf size={16} className="text-purple-100" weight="fill" />
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
      <p className="text-gray-300">{rating.description}</p>
    </div>
  )
}
