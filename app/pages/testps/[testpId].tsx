import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTestp from "app/testps/queries/getTestp"
import deleteTestp from "app/testps/mutations/deleteTestp"

export const Testp = () => {
  const router = useRouter()
  const testpId = useParam("testpId", "number")
  const [deleteTestpMutation] = useMutation(deleteTestp)
  const [testp] = useQuery(getTestp, { id: testpId })

  return (
    <>
      <Head>
        <title>Testp {testp.id}</title>
      </Head>

      <div>
        <h1>Testp {testp.id}</h1>
        <pre>{JSON.stringify(testp, null, 2)}</pre>

        <Link href={Routes.EditTestpPage({ testpId: testp.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTestpMutation({ id: testp.id })
              router.push(Routes.TestpsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTestpPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TestpsPage()}>
          <a>Testps</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Testp />
      </Suspense>
    </div>
  )
}

ShowTestpPage.authenticate = true
ShowTestpPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTestpPage
