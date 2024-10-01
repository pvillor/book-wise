import { Suspense } from 'react'

import { BooksList } from './components/books-list'
import { CategoriesTags } from './components/category-tags'
import { ExploreTitle } from './components/explore-title'
import { SearchForm } from './components/search-form'

export default function Explore() {
  return (
    <div className="py-12 px-24 flex-1 space-y-10 bg-opacity-50">
      <div className="flex justify-between">
        <ExploreTitle />

        <SearchForm />
      </div>

      <div className="flex flex-col gap-12">
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesTags />

          <BooksList />
        </Suspense>
      </div>
    </div>
  )
}
