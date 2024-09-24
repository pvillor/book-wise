import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/app/lib/prisma'

import { buildNextAuthOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(buildNextAuthOptions())

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.email === null) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
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
