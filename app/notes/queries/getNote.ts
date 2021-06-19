import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetNote = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetNote),
  (input) => input,
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const note = await db.note.findFirst({ where: { id } })

    if (!note) throw new NotFoundError()

    return note
  }
)