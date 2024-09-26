import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/app/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const query = z.string().default('').parse(searchParams.get('q'))

  const books = await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      author: true,
      coverUrl: true,
      categories: {
        select: {
          category: true,
        },
      },
      ratings: {
        select: {
          rate: true,
        },
      },
    },
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          author: {
            contains: query,
          },
        },
        {
          categories: {
            some: {
              category: {
                name: {
                  contains: query,
                },
              },
            },
          },
        },
      ],
    },
    orderBy: {
      name: 'asc',
    },
  })

  return NextResponse.json({
    books,
  })
}
