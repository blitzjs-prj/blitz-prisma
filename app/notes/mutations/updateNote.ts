import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateNote = z.object({
  id: z.number(),
  name: z.string(),
  content: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateNote),
  (input) => input,
  async ({ id, ...data }) => {
    // note: in multi-tenant app, you must add validation to ensure correct tenant
    const note = await db.note.update({ where: { id }, data })

    return note
  }
)
