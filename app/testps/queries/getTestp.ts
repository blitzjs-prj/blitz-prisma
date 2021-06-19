import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTestp = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTestp), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testp = await db.testp.findFirst({ where: { id } })

  if (!testp) throw new NotFoundError()

  return testp
})
