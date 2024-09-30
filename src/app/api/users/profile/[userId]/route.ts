import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/lib/prisma'

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } },
) {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      ratings: true,
    },
  })

  const booksCurrentUserRated = await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      totalPages: true,
      author: true,
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      ratings: {
        some: {
          userId: currentUser?.id,
        },
      },
    },
  })

  return NextResponse.json({
    profile: currentUser,
    books: booksCurrentUserRated,
  })
}
