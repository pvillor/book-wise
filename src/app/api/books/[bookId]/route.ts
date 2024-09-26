import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/lib/prisma'

export async function GET(
  _: NextRequest,
  { params }: { params: { bookId: string } },
) {
  const { bookId } = params

  const book = await prisma.book.findUnique({
    select: {
      id: true,
      name: true,
      author: true,
      coverUrl: true,
      totalPages: true,
      categories: {
        select: {
          category: true,
        },
      },
      ratings: {
        select: {
          id: true,
          rate: true,
          description: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
    where: {
      id: bookId,
    },
  })

  return NextResponse.json({
    book,
  })
}
