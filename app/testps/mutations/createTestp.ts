import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTestp = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTestp), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const testp = await db.testp.create({ data: input })

  return testp
})
