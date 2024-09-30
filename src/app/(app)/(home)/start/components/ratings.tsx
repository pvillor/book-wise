import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CaretRight, Star } from 'phosphor-react'
import { useQuery } from 'react-query'

import revolucaoDosBichos from '@/../public/images/books/a-revolucao-dos-bixos.jpg'

import { getRatings } from '../data/get-ratings'

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
      {isCurrentUserAuthenticated && (
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-gray-100 text-sm leading-relaxed font-light">
              Sua última leitura
            </h3>
            <Link
              href="/profile"
              className="text-purple-100 text-sm font-bold flex items-center gap-2 py-1 px-2 rounded-[4px] hover:bg-gray-700"
            >
              Ver todas <CaretRight size={16} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <div className="px-6 py-5 space-y-8 bg-gray-600 rounded-lg border-[2px] border-transparent">
              <div className="w-[560px] h-[152px] flex gap-6">
                <Image
                  src={revolucaoDosBichos}
                  alt=""
                  className="h-full w-auto rounded-[4px]"
                />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Há 2 dias</span>

                    <div className="flex gap-1">
                      <Star
                        size={16}
                        className="text-purple-100"
                        weight="fill"
                      />
                      <Star
                        size={16}
                        className="text-purple-100"
                        weight="fill"
                      />
                      <Star
                        size={16}
                        className="text-purple-100"
                        weight="fill"
                      />
                      <Star
                        size={16}
                        className="text-purple-100"
                        weight="fill"
                      />
                      <Star size={16} className="text-purple-100" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-100 leading-snug font-semibold">
                        A revolução dos bichos
                      </h4>
                      <span className="text-gray-400 text-sm leading-relaxed">
                        George Orwell
                      </span>
                    </div>
                    {/* max 229 */}
                    <p className="text-gray-300 font-light text-sm line-clamp-2">
                      Nec tempor nunc in egestas. Euismod nisi eleifend at et in
                      sagittis. Penatibus id vestibulum imperdiet a at imperdiet
                      lectu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-gray-100 text-sm leading-relaxed font-light">
          Avaliações mais recentes
        </h3>
        <div className="flex flex-col gap-3 pb-8">
          {data?.ratings.map((rating) => {
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
                    <Star size={16} className="text-purple-100" weight="fill" />
                    <Star size={16} className="text-purple-100" weight="fill" />
                    <Star size={16} className="text-purple-100" weight="fill" />
                    <Star size={16} className="text-purple-100" weight="fill" />
                    <Star size={16} className="text-purple-100" />
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
