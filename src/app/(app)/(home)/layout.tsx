'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/app/lib/react-query'

import { SideBar } from './components/sidebar'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="p-5 pb-4 h-screen flex">
      <SideBar />

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  )
}
