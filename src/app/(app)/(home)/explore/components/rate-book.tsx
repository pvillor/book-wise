'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { LoginDialog } from './login-dialog'
import { RateBookForm } from './rate-book-form'

export function RateBook() {
  const [loginDialogOpened, setLoginDialogOpened] = useState(false)
  const [rateBookFormOpened, setRateBookFormOpened] = useState(false)

  const session = useSession()

  const canUserRate = session.status === 'authenticated'

  function handleOpenRateBookFormIfUserIsAuthenticated() {
    canUserRate ? setRateBookFormOpened(true) : setLoginDialogOpened(true)
  }

  function handleCloseLoginDialog() {
    setLoginDialogOpened(false)
  }

  function handleCloseRateBookForm() {
    setRateBookFormOpened(false)
  }

  return (
    <div className="flex flex-col gap-10 pt-10">
      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-gray-100 text-sm leading-relaxed font-light">
            Avaliações
          </h3>
          {!rateBookFormOpened && (
            <button
              className="text-purple-100 text-sm font-bold flex items-center gap-2 py-1 px-2 rounded-[4px] hover:bg-gray-700"
              onClick={handleOpenRateBookFormIfUserIsAuthenticated}
            >
              Avaliar
            </button>
          )}
        </div>

        {loginDialogOpened && (
          <LoginDialog handleCloseLoginDialog={handleCloseLoginDialog} />
        )}
        {rateBookFormOpened && (
          <RateBookForm handleCloseRateBookForm={handleCloseRateBookForm} />
        )}
      </div>
    </div>
  )
}
