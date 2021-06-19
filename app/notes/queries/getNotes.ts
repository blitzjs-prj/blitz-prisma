import { resolver } from "blitz"
import db, { Prisma } from "db"

export default resolver.pipe(
  (input) => input,
  async () => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    return db.note.findMany()
  }
)
