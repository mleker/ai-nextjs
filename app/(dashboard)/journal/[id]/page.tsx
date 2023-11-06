import Editor from '@/app/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    }
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)

  return (
    <Editor entry={entry}/>
  )
}

export default EntryPage