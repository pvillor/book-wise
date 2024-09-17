'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Binoculars, ChartLineUp, SignIn, SignOut, User } from 'phosphor-react'

import logo from '@/app/assets/bookwise-logo.svg'

export function SideBar() {
  const session = useSession()
  const router = useRouter()

  const isCurrentUserAuthenticated = session.status === 'authenticated'
  const currentUser = session.data?.user

  function handleSignIn() {
    router.push('/auth')
  }

  function handleSignOut() {
    signOut({ callbackUrl: '/auth' })
  }

  return (
    <aside className="flex flex-col justify-between items-center h-full w-[232px] bg-gray-700 text-white pt-10 pb-6">
      <div className="flex flex-col gap-16  px-12">
        <Image src={logo} alt="" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 text-gray-100 font-bold hover:cursor-pointer">
            <div className="pr-1 rounded-full bg-gradient-to-b from-green-100 to-purple-100" />
            <ChartLineUp size={24} />
            <span>Início</span>
          </div>

          <div className="flex gap-3 text-gray-400 hover:cursor-pointer">
            <div className="pr-1 rounded-full bg-gradient-to-b" />
            <Binoculars size={24} />
            <span>Explorar</span>
          </div>

          {isCurrentUserAuthenticated && (
            <div className="flex gap-3 text-gray-400 hover:cursor-pointer">
              <div className="pr-1 rounded-full bg-gradient-to-b" />
              <User size={24} />
              <span>Perfil</span>
            </div>
          )}
        </div>
      </div>

      {isCurrentUserAuthenticated ? (
        <div
          className="flex items-center gap-3 hover:cursor-pointer"
          onClick={handleSignOut}
        >
          <Image
            src={currentUser?.image ?? ''}
            alt=""
            width={32}
            height={32}
            className=" rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
          />
          <span className="text-gray-200 font-bold leading-relaxed">
            {currentUser?.name}
          </span>
          <SignOut size={20} className="text-red-400 shrink-0" />
        </div>
      ) : (
        <div
          className="flex items-center gap-3 hover:cursor-pointer"
          onClick={handleSignIn}
        >
          <span className="text-gray-200 font-bold leading-relaxed">
            Fazer login
          </span>
          <SignIn size={20} className="text-green-100" />
        </div>
      )}
    </aside>
  )
}
