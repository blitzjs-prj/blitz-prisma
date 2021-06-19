import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTestp from "app/testps/mutations/createTestp"
import { TestpForm, FORM_ERROR } from "app/testps/components/TestpForm"

const NewTestpPage: BlitzPage = () => {
  const router = useRouter()
  const [createTestpMutation] = useMutation(createTestp)

  return (
    <div>
      <h1>Create New Testp</h1>

      <TestpForm
        submitText="Create Testp"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTestp}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const testp = await createTestpMutation(values)
            router.push(`/testps/${testp.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TestpsPage()}>
          <a>Testps</a>
        </Link>
      </p>
    </div>
  )
}

NewTestpPage.authenticate = true
NewTestpPage.getLayout = (page) => <Layout title={"Create New Testp"}>{page}</Layout>

export default NewTestpPage
