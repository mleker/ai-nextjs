import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      content: 'This day was wierd. I found 20 euros but I also lost my keys. So cant really say if it was a good day or a bad day. Feel exosted though.',
    },
  })

  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,  
    }
  })

  revalidatePath('/')

  return NextResponse.json({data: entry})

}