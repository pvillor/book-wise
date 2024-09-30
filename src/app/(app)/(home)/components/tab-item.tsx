'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ElementType } from 'react'

interface TabItemProps {
  value: string
  icon: ElementType
  title: string
  isSelected?: boolean
}

export function TabItem({
  value,
  title,
  icon: Icon,
  isSelected = false,
}: TabItemProps) {
  const router = useRouter()

  function handleTabNavigation(tab: string) {
    router.push(`/${tab}`)
  }

  return (
    <Tabs.Trigger
      value={value}
      className={`relative text-gray-400 data-[state=active]:text-gray-100 data-[state=active]:font-bold hover:text-gray-100 hover:cursor-pointer`}
      onClick={() => handleTabNavigation(value)}
    >
      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -left-1 right-full top-2 h-6 rounded-full bg-gradient-to-b from-green-100 to-purple-100"
        />
      )}
      <div
        className={`flex gap-3 pl-4 py-2 ${isSelected && 'text-gray-100 font-bold'}`}
      >
        <Icon size={24} />
        <span className="">{title}</span>
      </div>
    </Tabs.Trigger>
  )
}
