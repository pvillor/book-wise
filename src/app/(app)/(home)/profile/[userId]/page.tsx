'use client'

import { getYear } from 'date-fns'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  BookmarkSimple,
  BookOpen,
  Books,
  CaretLeft,
  User,
  UserList,
} from 'phosphor-react'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { z } from 'zod'

import { PageTitle } from '../../components/page-title'
import { BooksRated } from '../components/books-rated'
import { SearchForm } from '../components/search-form'
import { getProfile } from '../data/get-profile'

const currentUserSchema = z
  .object({
    id: z.string().nullish(),
    name: z.string().nullish(),
    email: z.string().nullish(),
    image: z.string().nullish(),
  })
  .nullish()

export default function Profile() {
  const session = useSession()
  const router = useRouter()

  const params = useParams()
  const userId = z.string().parse(params.userId)

  const { data: user } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfile(userId ?? ''),
  })

  const userBooksSummary = useMemo(() => {
    return user?.books.reduce(
      (acc, book) => {
        acc.totalPages += book.totalPages

        if (!acc.authors.some((author) => author === book.author)) {
          acc.authors.push(book.author)
        }

        book.categories.map(
          ({ category }) =>
            (acc.categories[category.name] =
              (acc.categories[category.name] || 0) + 1),
        )
        return acc
      },
      {
        totalPages: 0,
        authors: [] as string[],
        categories: {} as Record<string, number>,
      },
    )
  }, [user?.books])

  const mostReadCategory = useMemo(() => {
    if (!userBooksSummary?.categories) return null

    return Object.entries(userBooksSummary?.categories).reduce(
      (acc, [category, count]) => {
        return count > acc.count ? { category, count } : acc
      },
      { category: 'Nenhuma', count: 0 },
    )
  }, [userBooksSummary?.categories])

  if (!user || !userId) {
    return null
  }

  const authenticatedUser = currentUserSchema.parse(session.data?.user)

  const isAnotherUserProfile = authenticatedUser?.id !== userId

  function handleNavigateToPreviousPage() {
    router.back()
  }

  return (
    <div className="py-12 px-24 flex-1 space-y-10">
      {isAnotherUserProfile ? (
        <button
          className="flex gap-3 pt-1"
          onClick={handleNavigateToPreviousPage}
        >
          <CaretLeft size={20} className="text-gray-200" />
          <h1 className="leading-relaxed text-gray-200">Voltar</h1>
        </button>
      ) : (
        <PageTitle icon={User} title="Perfil" />
      )}

      <div className="flex gap-16 pb-12">
        <div className="flex flex-col gap-10">
          <div className="space-y-8">
            <SearchForm userId={userId} />

            <BooksRated userId={userId} />
          </div>
        </div>

        <div className="flex flex-col items-center border-l border-gray-700">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={user?.profile.avatarUrl ?? ''}
              alt=""
              width={72}
              height={72}
              className="size-[72px] rounded-full p-0.5 bg-gradient-to-b from-green-100 to-purple-100"
            />
            <div className="flex flex-col items-center pb-2">
              <h4 className="text-gray-100 text-xl">{user?.profile.name}</h4>
              <span className="text-gray-400 text-sm">
                membro desde {getYear(user?.profile.createdAt)}
              </span>
            </div>
          </div>

          <div className="h-1 w-8 my-8 bg-gradient-to-r from-green-100 to-purple-100" />

          <div className="py-5 px-14">
            <ul className="space-y-10 w-48">
              <li className="flex items-center gap-5">
                <BookOpen size={32} className="text-green-100" />
                <div>
                  <h4 className="text-gray-100 leading-snug font-semibold">
                    {userBooksSummary?.totalPages}
                  </h4>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Páginas lidas
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <Books size={32} className="text-green-100" />
                <div>
                  <h4 className="text-gray-100 leading-snug font-semibold">
                    {user.books.length}
                  </h4>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Livros avaliados
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <UserList size={32} className="text-green-100" />
                <div>
                  <h4 className="text-gray-100 leading-snug font-semibold">
                    {userBooksSummary?.authors.length}
                  </h4>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Autores lidos
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <BookmarkSimple size={32} className="text-green-100" />
                <div>
                  <h4 className="text-gray-100 leading-snug font-semibold">
                    {mostReadCategory?.category}
                  </h4>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Categoria mais lida
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
