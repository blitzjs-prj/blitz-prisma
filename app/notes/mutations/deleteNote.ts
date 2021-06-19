import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteNote = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteNote),
  (input) => input,
  async ({ id }) => {
    // note: in multi-tenant app, you must add validation to ensure correct tenant
    const note = await db.note.deleteMany({ where: { id } })

    return note
  }
)
