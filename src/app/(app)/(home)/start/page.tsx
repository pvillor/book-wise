'use client'

import { ChartLineUp } from 'phosphor-react'

import { PopularBooks } from './components/popular-books'
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

        <PopularBooks />
      </div>
    </div>
  )
}
