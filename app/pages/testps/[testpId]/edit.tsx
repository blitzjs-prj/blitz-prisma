import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTestp from "app/testps/queries/getTestp"
import updateTestp from "app/testps/mutations/updateTestp"
import { TestpForm, FORM_ERROR } from "app/testps/components/TestpForm"

export const EditTestp = () => {
  const router = useRouter()
  const testpId = useParam("testpId", "number")
  const [testp, { setQueryData }] = useQuery(getTestp, { id: testpId })
  const [updateTestpMutation] = useMutation(updateTestp)

  return (
    <>
      <Head>
        <title>Edit Testp {testp.id}</title>
      </Head>

      <div>
        <h1>Edit Testp {testp.id}</h1>
        <pre>{JSON.stringify(testp)}</pre>

        <TestpForm
          submitText="Update Testp"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTestp}
          initialValues={testp}
          onSubmit={async (values) => {
            try {
              const updated = await updateTestpMutation({
                id: testp.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTestpPage({ testpId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTestpPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTestp />
      </Suspense>

      <p>
        <Link href={Routes.TestpsPage()}>
          <a>Testps</a>
        </Link>
      </p>
    </div>
  )
}

EditTestpPage.authenticate = true
EditTestpPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTestpPage
