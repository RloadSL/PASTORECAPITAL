import ButtonApp from "components/ButtonApp"
import InputCheckFormikApp from "components/FormApp/components/InputCheckFormikApp "
import LoadMoreLoading from "components/LoadMoreLoading"
import { Field, Form, Formik } from "formik"
import { WP_TERM } from "infrastructure/dto/wp.dto"
import { getCategoriesPlans, updatePlanPost } from "infrastructure/wordpress/wp.utils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import style from './updatePlan.module.scss'

export default function UpdatePlan({wpToken, post_id, current_plans}:{wpToken?: string,post_id?: string, current_plans: any[]}){
  const {reload} = useRouter()
  const [plans, setPlans] = useState<any>([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
   
    getCategoriesPlans().then(res => {
      setPlans(res)
    })
  }, [])
  
  const _onUpdatePlan = async (plans:string[]) => {
    if (wpToken && post_id) {
      setloading(true)
      await updatePlanPost(
        post_id,
        wpToken,
        plans
      )
      reload()
    }
  }

  return (
  
    <div className='checklist'>
      <p style={{ textAlign: 'center' }}><FormattedMessage id={'select.label.plans'}/></p>
      <div
        role='group'
        style={{ display: 'flex' , justifyContent: 'center' , width: '100%'}}
        aria-labelledby='checkbox-group'
      >
        <Formik
          initialValues={{
            activated_to_plans: current_plans
          }}
          onSubmit={values => {
            _onUpdatePlan(values.activated_to_plans)
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
                  <div key={plan.term_id}>
                      <InputCheckFormikApp
                        name={'activated_to_plans'}
                        labelID={`plan.${plan.slug}`}
                        value={plan.term_id}
                        checked = {values.activated_to_plans?.includes(plan.term_id?.toString())}
                      >
                        <FormattedMessage id={`plan.${plan.name}`} />
                      </InputCheckFormikApp>
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