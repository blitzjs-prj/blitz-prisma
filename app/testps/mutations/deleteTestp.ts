import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTestp = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTestp), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testp = await db.testp.deleteMany({ where: { id } })

  return testp
})
