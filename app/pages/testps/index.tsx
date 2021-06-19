import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTestps from "app/testps/queries/getTestps"

const ITEMS_PER_PAGE = 100

export const TestpsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ testps, hasMore }] = usePaginatedQuery(getTestps, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {testps.map((testp) => (
          <li key={testp.id}>
            <Link href={Routes.ShowTestpPage({ testpId: testp.id })}>
              <a>{testp.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TestpsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Testps</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTestpPage()}>
            <a>Create Testp</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TestpsList />
        </Suspense>
      </div>
    </>
  )
}

TestpsPage.authenticate = true
TestpsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestpsPage
