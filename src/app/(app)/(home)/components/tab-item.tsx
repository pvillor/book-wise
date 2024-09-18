'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
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
  return (
    <Tabs.Trigger
      value={value}
      className="relative text-gray-400 data-[state=active]:text-gray-100 font-bold hover:cursor-pointer"
    >
      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -left-1 right-full h-full rounded-full bg-gradient-to-b from-green-100 to-purple-100"
        />
      )}
      <div className="flex gap-3 pl-4">
        <Icon size={24} />
        <span>{title}</span>
      </div>
    </Tabs.Trigger>
  )
}
