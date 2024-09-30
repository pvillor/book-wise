'use client'

import { useRouter } from 'next/navigation'
import { MagnifyingGlass } from 'phosphor-react'
import { FormEvent } from 'react'

interface SearchFormProps {
  userId: string
}

export function SearchForm({ userId }: SearchFormProps) {
  const router = useRouter()

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return router.push(`/profile/${userId}`)
    }

    router.push(`/profile/${userId}?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-[624px] py-3.5 px-5 flex border border-gray-500 rounded-[4px] focus-within:border-green-200 group"
    >
      <input
        name="q"
        placeholder="Buscar livro ou autor"
        className="flex-1 bg-transparent outline-none text-gray-200 caret-green-200"
      />
      <MagnifyingGlass
        size={20}
        className="text-gray-500 group-focus-within:text-green-200"
      />
    </form>
  )
}
