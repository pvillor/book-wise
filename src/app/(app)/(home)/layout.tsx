import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return <div className="p-5 pb-4 h-screen">{children}</div>
}
