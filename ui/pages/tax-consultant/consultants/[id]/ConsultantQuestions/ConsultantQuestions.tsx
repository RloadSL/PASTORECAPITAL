import CommentsListApp from 'components/CommentsApp'
import { useRouter } from 'next/router'
import ConsultantMenu from 'ui/pages/tax-consultant/components/ConsultantMenu'
import style from './consultant-questions.module.scss'
import { FormattedMessage, useIntl } from 'react-intl'

const ConsultantQuestions = () => {
  const { query } = useRouter()
  const intl = useIntl()

  return (
    <div className={style.consultantQuestions}>
      <ConsultantMenu />
      <h1 className='main-title'><FormattedMessage id='page.tax-consultant.landing.questions'/></h1>

      <div id='askResponses' className={style.consultantQuestions_container}>
        <CommentsListApp
          infoData={{
            mainTitle: intl.formatMessage({id: 'page.tax-consultant.landing.questions.mainTitle'}),
              description: intl.formatMessage({id: 'page.tax-consultant.landing.questions.description'})
          }}
          parent={{ id: query.id as string, path: 'user_consultant' }}
          main={true}
        />
      </div>
    </div>
  )
}

export default ConsultantQuestions