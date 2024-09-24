'use client'
import Image from 'next/image'
import Link from 'next/link'
import { CaretRight, ChartLineUp, Star } from 'phosphor-react'

import revolucaoDosBichos from '@/../public/images/books/a-revolucao-dos-bixos.jpg'

import { RatingsFeed } from './components/ratings'

export default function Start() {
  return (
    <div className="py-12 px-24 flex-1 space-y-10">
      <div className="flex gap-3 pt-1">
        <ChartLineUp size={32} className="text-green-100" />
        <h1 className="text-gray-100 text-2xl font-bold">Início</h1>
      </div>

      <div className="flex gap-16">
        <RatingsFeed />

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-gray-100 text-sm leading-relaxed font-light">
              Livros populares
            </h3>
            <Link
              href="/explore"
              className="text-purple-100 text-sm font-bold py-1 px-2 flex items-center gap-2 rounded-[4px] hover:bg-gray-700"
            >
              Ver todos <CaretRight size={16} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-[324px] h-[130px] py-[18px] px-5 flex gap-5 bg-gray-700 rounded-lg border-[2px] border-transparent hover:border-gray-600 hover:cursor-pointer">
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
