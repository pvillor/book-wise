import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/app/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { searchParams } = request.nextUrl

  const query = z.string().default('').parse(searchParams.get('q'))

  const ratings = await prisma.rating.findMany({
    select: {
      id: true,
      rate: true,
      description: true,
      createdAt: true,
      book: {
        select: {
          name: true,
          author: true,
          coverUrl: true,
        },
      },
    },
    where: {
      userId: params.userId,
      OR: [
        {
          book: {
            name: {
              contains: query,
            },
          },
        },
        {
          book: {
            author: {
              contains: query,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json({
    ratings,
  })
}
