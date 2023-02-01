import { FormattedMessage } from 'react-intl'
import ConsultantShortDetails from 'ui/pages/tax-consultant/components/ConsultantShortDetails'
import style from './profile.module.scss'
import ConsultantServiceList from 'ui/pages/tax-consultant/components/ConsultantServiceList'
import { useEffect, useState } from 'react'
import userConsultantRepository from 'infrastructure/repositories/userConsultant.repository'
import { UserConsultant } from 'domain/UserConsultant/UserConsultant'
import { useRouter } from 'next/router'
import LinkApp from 'components/LinkApp'
import iconEdit from '../../../../../../assets/img/icons/pencil.svg'
import addIcon from '../../../../../../assets/img/icons/add.svg'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import ButtonApp from 'components/ButtonApp'
import CommentsListApp from 'components/CommentsApp'
import ConsultantMenu from 'ui/pages/tax-consultant/components/ConsultantMenu'

const Profile = () => {
  const [loading, setloading] = useState(false)
  const [consultant, setConsultant] = useState<UserConsultant | undefined>()
  const { query, replace, asPath } = useRouter()
  const userLogged = useSelector(getUserLogged)
  //Get consultant ref
  useEffect(() => {
    let fetch = true
    if (query.id) {
      userConsultantRepository
        .getUserConsultant(query.id as string)
        .then(consultantRes => {
          if (fetch) {
            if (!consultantRes) {
              return replace('/tax-consultant/consultants')
            }
            setConsultant(consultantRes)
          }
        })
    }

    return () => {
      fetch = false
    }
  }, [query])

  const isAdmin = () => {
    return userLogged?.role.level >= 2 || userLogged?.uid === consultant?.uid
  }

  return (
    <div className={style.profile}>
      <ConsultantMenu />

      <header>
        <div className={`flex-container align-center`}>
          <div className='small-caps'>
            <FormattedMessage id={'page.tax-consultant.profile.smallTitle'} />
          </div>
          {isAdmin() && (
            <div className={style.adminButtons}>
              <LinkApp
                label={'btn.edit'}
                linkStyle={'edit'}
                linkHref={asPath + 'edit'}
                icon={iconEdit}
              />
            </div>
          )}
        </div>
        <div className={style.profileShortDetails}>
          <ConsultantShortDetails
            country={consultant?.country}
            name={consultant?.name as string}
            lastname={consultant?.lastname as string}
            avatar={consultant?.avatar}
            keywords={consultant?.keywords}
            state={consultant?.state}
          />
          <div className={style.rightContainer}>
            <a href={'#askResponses'} className={style.chatLink}>
              <span className='only-readers'>
                Ir a las preguntas y respuestas
              </span>
            </a>
            {consultant?.linkedin && (
              <a href={consultant?.linkedin} className={style.linkedinIcon}>
                linkedin
              </a>
            )}
          </div>
        </div>
        <div className={style.profileDescription}>
          <p>{consultant?.description}</p>
        </div>
      </header>
      <div className={style.profileServices}>
        <p className='small-caps'>
          <FormattedMessage
            id={'page.tax-consultant.profile.services.smallTitle'}
          />
        </p>
        <div className={style.buttonContainer}>
          {isAdmin() && (
            <LinkApp
              label='btn.add.service'
              linkStyle={'edit'}
              linkHref={asPath + 'services/create'}
              icon={addIcon}
              target={'_self'}
            />
          )}
        </div>
        <ConsultantServiceList consultantServiceListStyle={'fullList'} />
      </div>
      <div className={style.profileConversation}>
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
    </div>
  )
}

export default Profile
