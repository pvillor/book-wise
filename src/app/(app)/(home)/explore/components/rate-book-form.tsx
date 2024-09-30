import { zodResolver } from '@hookform/resolvers/zod'
import * as Radio from '@radix-ui/react-radio-group'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Check, Star, X } from 'phosphor-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { queryClient } from '@/app/lib/react-query'

const rateBookForm = z.object({
  description: z.string().min(3).max(450),
  rate: z.coerce.number().int().min(1).max(5),
})

type RateBookForm = z.infer<typeof rateBookForm>

interface RateBookFormProps {
  handleCloseRateBookForm: () => void
}

export function RateBookForm({ handleCloseRateBookForm }: RateBookFormProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(0)

  const session = useSession()

  const searchParams = useSearchParams()
  const bookId = searchParams.get('bookId')?.toLowerCase()

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RateBookForm>({
    resolver: zodResolver(rateBookForm),
  })

  async function handleCreateRating(data: RateBookForm) {
    console.log({ ...data, bookId })
    queryClient.invalidateQueries({ queryKey: ['book-details'] })
  }

  const currentUser = session.data?.user

  const ratingCharCount = watch('description')?.length

  return (
    <form
      onSubmit={handleSubmit(handleCreateRating)}
      className="p-6 flex flex-col gap-5 bg-gray-700 rounded-lg"
    >
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

        <Controller
          control={control}
          name="rate"
          render={({ field }) => {
            return (
              <Radio.RadioGroup
                className="flex gap-1"
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Radio.RadioGroupItem key={index} value={String(index + 1)}>
                    <Star
                      size={28}
                      className="text-purple-100 hover:cursor-pointer"
                      weight={
                        hoveredIndex >= index + 1 || selectedIndex >= index + 1
                          ? 'fill'
                          : 'regular'
                      }
                      onMouseEnter={() => setHoveredIndex(index + 1)}
                      onMouseLeave={() => setHoveredIndex(0)}
                      onClick={() => setSelectedIndex(index + 1)}
                    />
                  </Radio.RadioGroupItem>
                ))}
              </Radio.RadioGroup>
            )
          }}
        />
      </div>
      <div className="flex flex-col gap-3 items-end">
        <label className="h-40 w-full pr-2 pb-1 flex flex-col items-end bg-gray-800 border border-gray-500 rounded-[4px] focus-within:border-green-200 group">
          <textarea
            defaultValue=""
            maxLength={450}
            placeholder="Escreva sua avaliação"
            className="flex-1 w-full py-3.5 px-5 resize-none bg-transparent outline-none text-gray-200 caret-green-200 overflow-y-scroll"
            {...register('description')}
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
      </div>
    </form>
  )
}
