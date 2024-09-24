import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { Check, Star, X } from 'phosphor-react'
import { useState } from 'react'

import { GithubIcon } from '@/app/assets/github-icon'
import { GoogleIcon } from '@/app/assets/google-icon'

export function BookRating() {
  const [loginDialogOpened, setLoginDialogOpened] = useState(false)
  const [ratingFormOpened, setRatingFormOpened] = useState(false)
  const [ratingCharCount, setRatingCharCount] = useState(0)

  const session = useSession()

  const canUserRate = session.status === 'authenticated'
  const currentUser = session.data?.user

  function handleRateBookIfUserIsAuthenticated() {
    canUserRate ? setRatingFormOpened(true) : setLoginDialogOpened(true)
  }

  function handleCloseLoginDialog() {
    setLoginDialogOpened(false)
  }

  function handleCloseRatingForm() {
    setRatingFormOpened(false)
  }

  return (
    <div className="flex flex-col gap-10 pt-10">
      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-gray-100 text-sm leading-relaxed font-light">
            Avaliações
          </h3>
          {!ratingFormOpened && (
            <button
              className="text-purple-100 text-sm font-bold flex items-center gap-2 py-1 px-2 rounded-[4px] hover:bg-gray-700"
              onClick={handleRateBookIfUserIsAuthenticated}
            >
              Avaliar
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {loginDialogOpened && (
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
          )}
          {ratingFormOpened && (
            <div className="p-6 flex flex-col gap-5 bg-gray-700 rounded-lg">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="https://github.com/pvillor.jpg"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
                  />
                  <h4 className="text-gray-100 font-semibold">Paulo Victor</h4>
                </div>

                <div className="flex gap-1">
                  <Star size={28} className="text-purple-100" />
                  <Star size={28} className="text-purple-100" />
                  <Star size={28} className="text-purple-100" />
                  <Star size={28} className="text-purple-100" />
                  <Star size={28} className="text-purple-100" />
                </div>
              </div>
              <form className="flex flex-col gap-3 items-end">
                <label className="h-40 w-full pr-2 pb-1 flex flex-col items-end bg-gray-800 border border-gray-500 rounded-[4px] focus-within:border-green-200 group">
                  <textarea
                    placeholder="Escreva sua avaliação"
                    className="flex-1 w-full py-3.5 px-5 resize-none bg-transparent outline-none text-gray-200 caret-green-200 overflow-y-scroll"
                    onChange={(e) =>
                      setRatingCharCount(e.currentTarget.value.length)
                    }
                  />
                  <span className="text-xs leading-relaxed text-gray-400">
                    {ratingCharCount}/450
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-2 bg-gray-600 text-purple-100 rounded-[4px] hover:bg-gray-500"
                    onClick={handleCloseRatingForm}
                  >
                    <X size={24} />
                  </button>
                  <button
                    type="submit"
                    className="p-2 bg-gray-600 text-green-100 rounded-[4px] hover:bg-gray-500"
                  >
                    <Check size={24} />
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="p-6 flex flex-col gap-5 bg-gray-600 rounded-lg">
            <div className="flex justify-between">
              <div className="flex items-start gap-4">
                <Image
                  src="https://github.com/pvillor.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
                />
                <div>
                  <h4 className="text-gray-100">Paulo Victor</h4>
                  <span className="text-gray-400 text-sm">Hoje</span>
                </div>
              </div>

              <div className="flex gap-1">
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" />
              </div>
            </div>
            <p className="text-gray-300">
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus
              leo. Sit porta eget nec vitae sit vulputate eget
            </p>
          </div>
          <div className="p-6 flex flex-col gap-5 bg-gray-700 rounded-lg">
            <div className="flex justify-between">
              <div className="flex items-start gap-4">
                <Image
                  src="https://github.com/pvillor.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
                />
                <div>
                  <h4 className="text-gray-100">Paulo Victor</h4>
                  <span className="text-gray-400 text-sm">Hoje</span>
                </div>
              </div>

              <div className="flex gap-1">
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" />
              </div>
            </div>
            <p className="text-gray-300">
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus
              leo. Sit porta eget nec vitae sit vulputate eget
            </p>
          </div>
          <div className="p-6 flex flex-col gap-5 bg-gray-700 rounded-lg">
            <div className="flex justify-between">
              <div className="flex items-start gap-4">
                <Image
                  src="https://github.com/pvillor.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
                />
                <div>
                  <h4 className="text-gray-100">Paulo Victor</h4>
                  <span className="text-gray-400 text-sm">Hoje</span>
                </div>
              </div>

              <div className="flex gap-1">
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" weight="fill" />
                <Star size={16} className="text-purple-100" />
              </div>
            </div>
            <p className="text-gray-300">
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus
              leo. Sit porta eget nec vitae sit vulputate eget
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
