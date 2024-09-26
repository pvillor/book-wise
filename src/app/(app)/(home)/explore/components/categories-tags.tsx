'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from 'react-query'

import { getCategories } from '../data/get-categories'
import { CategoryTab } from './category-tab'

export function CategoriesTags() {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <Tabs.Root>
      <Tabs.List className="flex flex-wrap gap-3">
        <CategoryTab value="all" title="Tudo" />
        {data?.categories.map((category) => {
          return (
            <CategoryTab
              key={category.name}
              value={category.name}
              title={category.name}
            />
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
