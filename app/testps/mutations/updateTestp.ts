import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTestp = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTestp),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const testp = await db.testp.update({ where: { id }, data })

    return testp
  }
)
