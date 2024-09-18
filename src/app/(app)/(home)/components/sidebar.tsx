'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { SignIn, SignOut } from 'phosphor-react'

import { SideBarTabs } from './sidebar-tabs'

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
      <SideBarTabs isCurrentUserAuthenticated={isCurrentUserAuthenticated} />

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
