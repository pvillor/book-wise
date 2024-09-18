import { ReactNode } from 'react'

import { SideBar } from './components/sidebar'

interface HomeLayoutProps {
  children: ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="p-5 pb-4 h-screen flex">
      <SideBar />

      {children}
    </div>
  )
}
