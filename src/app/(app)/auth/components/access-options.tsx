'use client'
import { redirect, useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import { GithubIcon } from '@/app/assets/github-icon'
import { GoogleIcon } from '@/app/assets/google-icon'
import { RocketIcon } from '@/app/assets/rocket-icon'

export function AccessOptions() {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'authenticated') {
    redirect('/start')
  }

  function handleAccessAsGuest() {
    router.push('/start')
  }

  return (
    <div className="w-[372px] flex flex-col gap-4 text-gray-100">
      <div
        className="p-5 flex items-center gap-5 font-bold bg-gray-600 rounded-lg hover:cursor-pointer"
        onClick={() => signIn('google')}
      >
        <GoogleIcon />
        <p>Entrar com Google</p>
      </div>
      <div
        className="p-5 flex items-center gap-5 font-bold bg-gray-600 rounded-lg hover:cursor-pointer"
        onClick={() => signIn('github')}
      >
        <GithubIcon />
        <p>Entrar com GitHub</p>
      </div>
      <div
        className="p-5 flex items-center gap-5 font-bold bg-gray-600 rounded-lg hover:cursor-pointer"
        onClick={handleAccessAsGuest}
      >
        <RocketIcon />
        <p>Acessar como visitante</p>
      </div>
    </div>
  )
}
