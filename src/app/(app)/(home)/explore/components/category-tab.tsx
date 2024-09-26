'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useRouter } from 'next/navigation'

interface CategoryTabProps {
  value: string
  title: string
  isSelected: boolean
}

export function CategoryTab({ value, title, isSelected }: CategoryTabProps) {
  const router = useRouter()

  function handleFilterByTag(category: string) {
    if (category === 'all') {
      return router.push('/explore')
    }

    router.push(`/explore?q=${category}`)
  }

  return (
    <Tabs.Trigger
      value={value}
      className={`text-purple-100 border border-purple-100 rounded-full py-1 px-4 data-[state=active]:text-gray-100 data-[state=active]:bg-purple-200 data-[state=active]:border-purple-200 hover:text-gray-100 hover:bg-purple-200  hover:cursor-pointer ${isSelected && 'bg-purple-200 border-purple-200'}`}
      onClick={() => handleFilterByTag(value)}
    >
      <span className={`${isSelected && 'text-gray-100'}`}>{title}</span>
    </Tabs.Trigger>
  )
}
