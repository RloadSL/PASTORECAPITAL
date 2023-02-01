import CommentsListApp from 'components/CommentsApp'
import { useRouter } from 'next/router'
import ConsultantMenu from 'ui/pages/tax-consultant/components/ConsultantMenu'
import style from './consultant-questions.module.scss'
const ConsultantQuestions = () => {
  const { query } = useRouter()

  
  return (
    <div className={style.profileConversation}>
    <ConsultantMenu />
    <div id='askResponses'>
      <CommentsListApp
        infoData={{
          mainTitle: 'Preguntas:',
          description: 'Comenta tus dudas con el asesor.'
        }}
        parent={{ id: query.id as string, path: 'user_consultant' }}
        main={true}
      />
    </div>
  </div>
  )
}

export default ConsultantQuestions