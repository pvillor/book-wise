'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useSearchParams } from 'next/navigation'
import { useQuery } from 'react-query'

import { getCategories } from '../data/get-categories'
import { CategoryTab } from './category-tab'

export function CategoriesTags() {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('q')

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <Tabs.Root>
      <Tabs.List className="flex flex-wrap gap-3">
        <CategoryTab value="all" title="Tudo" isSelected={!currentTag} />
        {data?.categories.map((category) => {
          return (
            <CategoryTab
              key={category.name}
              value={category.name}
              title={category.name}
              isSelected={currentTag === category.name}
            />
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
