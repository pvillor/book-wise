import { ElementType } from 'react'

interface PageTitleProps {
  icon: ElementType
  title: string
}

export function PageTitle({ icon: Icon, title }: PageTitleProps) {
  return (
    <div className="flex gap-3 pt-1">
      <Icon size={32} className="text-green-100" />
      <h1 className="text-gray-100 text-2xl font-bold">{title}</h1>
    </div>
  )
}
