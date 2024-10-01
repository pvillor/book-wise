import './globals.css'

import { Nunito_Sans as NunitoSans } from 'next/font/google'
import Head from 'next/head'

import { SessionWrapper } from './components/session-wrapper'

const nunitoSans = NunitoSans({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <Head>
        <link rel="icon" href="/bookwise-icon.svg" />
      </Head>
      <body className={`${nunitoSans.className} bg-gray-800 antialiased`}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}
