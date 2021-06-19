import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTestpsInput
  extends Pick<Prisma.TestpFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTestpsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: testps,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.testp.count({ where }),
      query: (paginateArgs) => db.testp.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      testps,
      nextPage,
      hasMore,
      count,
    }
  }
)
