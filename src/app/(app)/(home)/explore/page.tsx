'use client'
import * as Tabs from '@radix-ui/react-tabs'
import Image from 'next/image'
import {
  Binoculars,
  BookmarkSimple,
  BookOpen,
  MagnifyingGlass,
  Star,
  X,
} from 'phosphor-react'
import { useState } from 'react'

import revolucaoDosBichos from '@/app/assets/books/revolucao-bichos.png'

import { BookRating } from './components/book-rating'
import { CategoryTab } from './components/category-tab'

export default function Explore() {
  const [bookRatingsDialogOpened, setBookRatingsDialogOpened] = useState(false)

  function handleOpenBookRatingDialog() {
    setBookRatingsDialogOpened(true)
  }

  function handleCloseBookRatingDialog() {
    setBookRatingsDialogOpened(false)
  }

  return (
    <>
      {bookRatingsDialogOpened && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="absolute top-0 right-0 h-screen overflow-y-auto w-[660px] bg-gray-800 py-16 px-12">
            <button
              className="absolute top-6 right-12"
              onClick={handleCloseBookRatingDialog}
            >
              <X size={24} className="text-gray-400" />
            </button>

            <div className="py-4 px-8 space-y-10 bg-gray-700 rounded-lg">
              <div className="flex gap-8">
                <Image
                  src={revolucaoDosBichos}
                  alt=""
                  className="h-[242px] w-auto rounded-[10px]"
                />

                <div className="space-y-4">
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-gray-100 text-lg leading-snug font-semibold">
                        A revolução dos bichos
                      </h4>
                      <span className="text-gray-300 leading-relaxed">
                        George Orwell
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <Star
                          size={20}
                          className="text-purple-100"
                          weight="fill"
                        />
                        <Star
                          size={20}
                          className="text-purple-100"
                          weight="fill"
                        />
                        <Star
                          size={20}
                          className="text-purple-100"
                          weight="fill"
                        />
                        <Star
                          size={20}
                          className="text-purple-100"
                          weight="fill"
                        />
                        <Star size={20} className="text-purple-100" />
                      </div>
                      <span className="text-gray-400 text-sm leading-relaxed">
                        3 avaliações
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
                    <h4 className="text-gray-100 leading-snug font-semibold">
                      Computação, educação
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
                      160
                    </h4>
                  </div>
                </li>
              </ul>
            </div>

            <BookRating />
          </div>
        </>
      )}

      <div className="py-12 px-24 flex-1 space-y-10 bg-opacity-50">
        <div className="flex justify-between">
          <div className="flex gap-3 pt-1">
            <Binoculars size={32} className="text-green-100" />
            <h1 className="text-gray-100 text-2xl font-bold">Explorar</h1>
          </div>

          <div className="w-[433px] py-3.5 px-5 flex border border-gray-500 rounded-[4px] focus-within:border-green-200 group">
            <input
              placeholder="Buscar livro ou autor"
              className="flex-1 bg-transparent outline-none text-gray-200 caret-green-200"
            />
            <MagnifyingGlass
              size={20}
              className="text-gray-500 group-focus-within:text-green-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Tabs.Root>
            <Tabs.List className="flex flex-wrap gap-3">
              <CategoryTab value="all" title="Tudo" />
              <CategoryTab value="computing" title="Computação" />
              <CategoryTab value="education" title="Educação" />
              <CategoryTab value="fantasy" title="Fantasia" />
              <CategoryTab value="fiction" title="Ficção Científica" />
              <CategoryTab value="horror" title="Horror" />
              <CategoryTab value="hqs" title="HQs" />
              <CategoryTab value="suspense" title="Suspense" />
            </Tabs.List>
          </Tabs.Root>

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-3 min-w-[318px]">
              <div
                className="py-4 px-5 flex gap-5 bg-gray-700 rounded-lg border-[2px] border-transparent hover:border-gray-600 hover:cursor-pointer"
                onClick={handleOpenBookRatingDialog}
              >
                <Image
                  src={revolucaoDosBichos}
                  alt=""
                  className="h-[152px] w-auto rounded-[4px]"
                />
                <div className="flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-gray-100 leading-snug font-semibold">
                        A revolução dos bichos
                      </h4>
                      <span className="text-gray-400 text-sm leading-relaxed">
                        George Orwell
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
