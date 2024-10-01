import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/app/lib/auth/options'
import { prisma } from '@/app/lib/prisma'

const currentUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string(),
})

const createRatingSchema = z.object({
  description: z.string().min(3).max(450),
  rate: z.number().int().min(1).max(5),
})

export async function POST(
  request: NextRequest,
  { params }: { params: { bookId: string } },
) {
  const session = await getServerSession(authOptions)
  const currentUser = currentUserSchema.parse(session?.user)

  const body = await request.json()
  const { description, rate } = createRatingSchema.parse(body)

  const rating = await prisma.rating.create({
    data: {
      description,
      rate,
      bookId: params.bookId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json({
    ratingId: rating.id,
  })
}
