import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Check, Star, X } from 'phosphor-react'
import { useState } from 'react'

interface RateBookFormProps {
  handleCloseRateBookForm: () => void
}

export function RateBookForm({ handleCloseRateBookForm }: RateBookFormProps) {
  const [ratingCharCount, setRatingCharCount] = useState(0)
  const session = useSession()

  const currentUser = session.data?.user

  return (
    <div className="p-6 flex flex-col gap-5 bg-gray-700 rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={currentUser?.image ?? ''}
            alt=""
            width={40}
            height={40}
            className="rounded-full p-px bg-gradient-to-b from-green-100 to-purple-100"
          />
          <h4 className="text-gray-100 font-semibold">{currentUser?.name}</h4>
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
            onChange={(e) => setRatingCharCount(e.currentTarget.value.length)}
          />
          <span className="text-xs leading-relaxed text-gray-400">
            {ratingCharCount}/450
          </span>
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 bg-gray-600 text-purple-100 rounded-[4px] hover:bg-gray-500"
            onClick={handleCloseRateBookForm}
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
  )
}
