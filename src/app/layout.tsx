import './globals.css'

import { Metadata } from 'next'
import { Nunito_Sans as NunitoSans } from 'next/font/google'

import { SessionWrapper } from './components/session-wrapper'

const nunitoSans = NunitoSans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  icons: '/bookwise-icon.svg',
  title: 'Book Wise',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunitoSans.className} bg-gray-800 antialiased`}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}
