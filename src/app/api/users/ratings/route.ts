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

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

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
      userId: user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json({
    ratings,
  })
}
