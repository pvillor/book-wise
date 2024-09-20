'use client'

import * as Tabs from '@radix-ui/react-tabs'

interface CategoryTabProps {
  value: string
  title: string
  isSelected?: boolean
}

export function CategoryTab({
  value,
  title,
  isSelected = false,
}: CategoryTabProps) {
  return (
    <Tabs.Trigger
      value={value}
      className="text-purple-100 border border-purple-100 rounded-full py-1 px-4 data-[state=active]:text-gray-100 data-[state=active]:bg-purple-200 data-[state=active]:border-purple-200 hover:text-gray-100 hover:bg-purple-200  hover:cursor-pointer"
    >
      <span>{title}</span>
    </Tabs.Trigger>
  )
}
