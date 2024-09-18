'use client'
import Image from 'next/image'
import Link from 'next/link'
import { CaretRight, ChartLineUp, Star } from 'phosphor-react'

import revolucaoDosBichos from '@/app/assets/books/revolucao-bichos.png'

export default function Start() {
  return (
    <div className="py-12 px-24 flex-1 space-y-10">
      <div className="flex gap-3 pt-1">
        <ChartLineUp size={32} className="text-green-100" />
        <h1 className="text-gray-100 text-2xl font-bold">Início</h1>
      </div>

      <div className="flex gap-16">
        <div className="space-y-4">
          <h3 className="text-gray-100 text-sm leading-relaxed">
            Avaliações mais recentes
          </h3>
          <div className="flex flex-col gap-3">
            <div className="p-6 space-y-8 bg-gray-700 rounded-lg">
              <div className="flex justify-between">
                <div className="flex items-start gap-4">
                  <Image
                    src="https://github.com/pvillor.png"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
                  />
                  <div>
                    <h4 className="text-gray-100">Paulo Victor</h4>
                    <span className="text-gray-400 text-sm">Hoje</span>
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
                  src={revolucaoDosBichos}
                  alt=""
                  className="h-full w-auto rounded-[4px]"
                />
                <div className="space-y-5">
                  <div>
                    <h4 className="text-gray-100 leading-snug font-semibold">
                      A revolução dos bichos
                    </h4>
                    <span className="text-gray-400 text-sm leading-relaxed">
                      George Orwell
                    </span>
                  </div>
                  {/* max 229 */}
                  <p className="text-gray-300 font-light text-sm line-clamp-4">
                    Semper et sapien proin vitae nisi. Feugiat neque integer
                    donec et aenean posuere amet ultrices. Cras fermentum id
                    pulvinar varius leo a in. Amet libero pharetra nunc
                    elementum fringilla velit ipsum. Sed vulputate massa velit
                    nibh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-gray-100 text-sm leading-relaxed">
              Livros populares
            </h3>
            <Link
              href="/explore"
              className="text-purple-100 font-bold flex items-center gap-2"
            >
              Ver todos <CaretRight size={16} />
            </Link>
          </div>
          <div>
            <div className="w-[324px] h-[130px] py-[18px] px-5 flex gap-5 bg-gray-700 rounded-lg">
              <Image
                src={revolucaoDosBichos}
                alt=""
                className="h-full w-auto rounded-[4px]"
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
  )
}
