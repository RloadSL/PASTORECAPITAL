import ButtonApp from "components/ButtonApp"
import LoadMoreLoading from "components/LoadMoreLoading"
import { Field, Form, Formik } from "formik"
import { WP_TERM } from "infrastructure/dto/wp.dto"
import { getCategoriesPlans, updatePlanPost } from "infrastructure/wordpress/wp.utils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import style from './updatePlan.module.scss'

export default function UpdatePlan({wpToken, post_id, current_plan_id}:{wpToken?: string,post_id?: string, current_plan_id?:string}){
  const {reload} = useRouter()
  const [plans, setPlans] = useState<any>([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
   
    getCategoriesPlans().then(res => {
      setPlans(res)
    })
  }, [])
  
  const _onUpdatePlan = async ({ new_plan }: any) => {
    if (wpToken && post_id) {
      setloading(true)
      await updatePlanPost(
        post_id,
        wpToken,
        new_plan
      )
      reload()
    }
  }

  return (
  
    <div className='checklist'>
      <p style={{ textAlign: 'center' }}>Seleccione el plan correspondiente</p>
      <div
        role='group'
        style={{ display: 'flex' , justifyContent: 'center' , width: '100%'}}
        aria-labelledby='checkbox-group'
      >
        <Formik
          initialValues={{
            activated_to_plan: current_plan_id
          }}
          onSubmit={values => {
            _onUpdatePlan({new_plan: values.activated_to_plan})
          }}
        >
          {({ values, errors, touched }) => (
            <Form className={style.form}>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                {plans.map((plan: WP_TERM) => (
                  <div role='group' key={plan.term_id}>
                    <label>
                      <Field
                        type='radio'
                        name='activated_to_plan'
                        value={plan.term_id?.toString()}
                      />
                      {plan.name}
                    </label>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: '20px',
                  maxWidth: '300px',
                  margin: 'auto'
                }}
              >
                {loading ? <LoadMoreLoading/> :<ButtonApp
                  buttonStyle='secondary'
                  type='submit'
                  labelID='page.analysis.articles.form.update'
                />}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )

}