'use client'

import Image from 'next/image'
import {
  BookmarkSimple,
  BookOpen,
  Books,
  MagnifyingGlass,
  Star,
  User,
  UserList,
} from 'phosphor-react'

import revolucaoDosBichos from '@/app/assets/books/revolucao-bichos.png'

export default function Profile() {
  return (
    <div className="py-12 px-24 flex-1 space-y-10">
      <div className="flex gap-3 pt-1">
        <User size={32} className="text-green-100" />
        <h1 className="text-gray-100 text-2xl font-bold">Perfil</h1>
      </div>

      <div className="flex gap-16 pb-12">
        <div className="flex flex-col gap-10">
          <div className="space-y-8">
            <div className="w-full py-3.5 px-5 flex border border-gray-500 rounded-[4px] focus-within:border-green-200 group">
              <input
                placeholder="Buscar livro avaliado"
                className="flex-1 bg-transparent outline-none text-gray-200 caret-green-200"
              />
              <MagnifyingGlass
                size={20}
                className="text-gray-500 group-focus-within:text-green-200"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-gray-400 text-sm">Há 2 dias</span>
                <div className="w-[624px] p-6 space-y-6 bg-gray-700 rounded-lg border-[2px] border-transparent hover:border-gray-600 hover:cursor-pointer">
                  <div className="flex gap-6">
                    <Image
                      src={revolucaoDosBichos}
                      alt=""
                      className="h-[134px] w-[98px] rounded-[4px]"
                    />

                    <div className="space-y-3">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h4 className="text-gray-100 leading-snug font-semibold text-lg">
                            A revolução dos bichos
                          </h4>
                          <span className="text-gray-400 text-sm leading-relaxed">
                            George Orwell
                          </span>
                        </div>

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
                    </div>
                  </div>
                  <p className="text-gray-300 font-light text-sm line-clamp-2">
                    Nec tempor nunc in egestas. Euismod nisi eleifend at et in
                    sagittis. Penatibus id vestibulum imperdiet a at imperdiet
                    lectu
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-gray-400 text-sm">Há 2 dias</span>
                <div className="w-[624px] p-6 space-y-6 bg-gray-700 rounded-lg border-[2px] border-transparent hover:border-gray-600 hover:cursor-pointer">
                  <div className="flex gap-6">
                    <Image
                      src={revolucaoDosBichos}
                      alt=""
                      className="h-[134px] w-[98px] rounded-[4px]"
                    />

                    <div className="space-y-3">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h4 className="text-gray-100 leading-snug font-semibold text-lg">
                            A revolução dos bichos
                          </h4>
                          <span className="text-gray-400 text-sm leading-relaxed">
                            George Orwell
                          </span>
                        </div>

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
                    </div>
                  </div>
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

        <div className="flex flex-col items-center border-l border-gray-700">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="https://github.com/pvillor.png"
              alt=""
              width={72}
              height={72}
              className="rounded-full p-0.5 bg-gradient-to-b from-green-100 to-purple-100"
            />
            <div className="flex flex-col items-center pb-2">
              <h4 className="text-gray-100 text-xl">Paulo Victor</h4>
              <span className="text-gray-400 text-sm">membro desde 2024</span>
            </div>
          </div>

          <div className="h-1 w-8 my-8 bg-gradient-to-r from-green-100 to-purple-100" />

          <div className="py-5 px-14">
            <ul className="space-y-10 w-48">
              <li className="flex items-center gap-5">
                <BookOpen size={32} className="text-green-100" />
                <div>
                  <h4 className="text-gray-100 leading-snug font-semibold">
                    3853
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
                    10
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
                    8
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
                    Computação
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
