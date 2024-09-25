import { NextResponse } from 'next/server'

import { prisma } from '@/app/lib/prisma'

export async function GET() {
  const ratings = await prisma.rating.findMany({
    select: {
      id: true,
      rate: true,
      description: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      book: {
        select: {
          name: true,
          author: true,
          coverUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json({
    ratings,
  })
}
