import { NextResponse } from 'next/server'

import { prisma } from '@/app/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return NextResponse.json({
    categories,
  })
}
