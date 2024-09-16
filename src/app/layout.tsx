import './globals.css'

import { Nunito_Sans as NunitoSans } from 'next/font/google'

const nunitoSans = NunitoSans({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunitoSans.className} bg-gray-800 antialiased`}>
        {children}
      </body>
    </html>
  )
}
