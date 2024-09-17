'use client'
import { signIn } from 'next-auth/react'

import { GithubIcon } from '../../assets/github-icon'
import { GoogleIcon } from '../../assets/google-icon'
import { RocketIcon } from '../../assets/rocket-icon'

export function AccessOptions() {
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
      <div className="p-5 flex items-center gap-5 font-bold bg-gray-600 rounded-lg hover:cursor-pointer">
        <RocketIcon />
        <p>Acessar como visitante</p>
      </div>
    </div>
  )
}
