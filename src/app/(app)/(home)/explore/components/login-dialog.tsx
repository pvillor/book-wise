'use client'

import { signIn } from 'next-auth/react'
import { X } from 'phosphor-react'

import { GithubIcon } from '@/app/assets/github-icon'
import { GoogleIcon } from '@/app/assets/google-icon'

interface LoginDialogProps {
  handleCloseLoginDialog: () => void
}

export function LoginDialog({ handleCloseLoginDialog }: LoginDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="absolute bg-gray-700 py-14 px-16">
        <button
          className="absolute top-4 right-4"
          onClick={handleCloseLoginDialog}
        >
          <X size={24} className="text-gray-400" />
        </button>
        <div className="flex flex-col items-center gap-10 text-gray-100 px-2">
          <h2>Faça login para deixar sua avaliação</h2>
          <div className="flex flex-col gap-4 w-[372px]">
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
          </div>
        </div>
      </div>
    </div>
  )
}
