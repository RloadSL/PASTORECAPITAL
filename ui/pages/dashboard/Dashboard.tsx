/* eslint-disable react-hooks/exhaustive-deps */

import { NextPage } from 'next'
import parse from 'html-react-parser'
import { FormattedMessage } from 'react-intl'
import style from './dashboard.module.scss'
import InfoColorCard from './InfoColorCard'
import consultandIcon from '../../../assets/img/consultant.png'
import resourcesIcon from '../../../assets/img/resources.png'
import coursesIcon from '../../../assets/img/our-courses.png'
import amasIcon from '../../../assets/img/recent-amas.png'
import discordIcon from '../../../assets/img/discord.png'
import Link from 'next/link'
import InfoTextCard from './InfoTextCard'
import { dashboardFlashUpdates } from 'ui/utils/test.data'
import AdvertisingList from './AdvertisingList'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import LinkApp from 'components/LinkApp'
import ItemList from 'components/ItemList'
import { useEffect, useState } from 'react'
import newsRepository from 'infrastructure/repositories/news.repository'
import { News } from 'domain/News/News'
import Loading from 'components/Loading'
import { Webinars } from 'domain/Webinars/Webinars'
import webinarsRepository from 'infrastructure/repositories/webinars.repository'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { Post } from 'domain/Post/Post'
import { FlashUpdatesRepositoryInstance } from 'infrastructure/repositories/flashupdates.repository'
import { useRouter } from 'next/router'
import amasRepository from 'infrastructure/repositories/amas.repository'
import { Chatroom } from 'domain/Chatroom/Chatroom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'ui/redux/store'
import { cleanMessages, setChatroom } from 'ui/redux/slices/amas/amas.slice'
import { setDashboardAmaState, setDashboardFUState, setDashboardNewsState, setDashboardResearchState, setDashboardWebinarState } from 'ui/redux/slices/dashboard/dashboard.slice'
import { dashboardState } from 'ui/redux/slices/dashboard/dashboard.selectors'
import InfoList from './InfoList'
const months = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic'
]



//Componente para la lista de las noticias
const NewsList = () => {
  const { limitTextLength } = useComponentUtils()
  const dispatch = useDispatch<AppDispatch>()
  const { news } = useSelector(dashboardState)

  useEffect(() => {
    let fetch = true
    if (!news)
      newsRepository
        .getNews({ search: '', tickers: 'AllTickers', items: 3 })
        .then(result => {
          dispatch(setDashboardNewsState(result.data))
        })
    return () => {
      fetch = false
    }
  }, [])

  return !news ? (
    <Loading loading variant='inner-primary' />
  ) : (
    // <>
    //   <ItemList
    //     items={news.map((singleNew: News) => {
    //       return (
    //         <div className={style.news_item} key={singleNew.news_url}>
    //           <Link href={singleNew.news_url} target='_blank'>
    //             <a>
    //               <h3 className={style.news_item__title}>
    //                 {limitTextLength(90, singleNew.title)}
    //               </h3>
    //               <p className={style.news_item__footer}>
    //                 {singleNew.source_name}{' '}
    //                 <span>{singleNew.date.toLocaleString()}</span>
    //               </p>
    //             </a>
    //           </Link>
    //         </div>
    //       )
    //     })}
    //   />
    // </>
    <InfoList list={news} />
  )
}

//Componente que renderiza el último webinar, sustituir datos estáticos por reales
const LastWebinarRender = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { webinar } = useSelector(dashboardState)
  useEffect(() => {
    let fetch = true

    const toDay = new Date()
    if (!webinar)
      webinarsRepository
        .elasticSearch({
          query: '',
          filters: {
            date: {
              from: new Date(
                toDay.getFullYear(),
                toDay.getMonth(),
                toDay.getDate()
              )
            }
          },
          page: { size: 1, current: 1 }
        })
        .then((res: any) => {
          const { results } = res
          if (results[0]) dispatch(setDashboardWebinarState(results[0]))
        })
    return () => {
      fetch = false
    }
  }, [])

  return !webinar ? (
    <p>Sin proximos webinars</p>
  ) : (
    <div className={style.lastWebinar}>
      <div className={style.top}>
        <div className={style.lastWebinar_date}>
          <span className={style.lastWebinar_date__day}>
            {webinar?.date.getDate()}
          </span>
          <span className={style.lastWebinar_date__month}>
            {months[webinar?.date.getMonth() as number]}
          </span>
        </div>
        <div className={style.lastWebinar_info}>
          <h3>{webinar?.title}</h3>
          <p className={style.lastWebinar_info__author}>
            {webinar?.guests}
          </p>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.linkButton}>
          <LinkApp
            label={'page.dashboard.lastWebinars.button.label'}
            linkHref={'/webinars/deferred'}
            target={'_self'}
          />
        </div>
      </div>
    </div>
  )
}

//Componente que renderiza el contenido de research, debe pintar una noticia de bitcoins y otra de altcoins
const ResearchRender = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { research } = useSelector(dashboardState)
  const userLogged = useSelector(getUserLogged)
  const [loading, setloading] = useState<boolean>(true)
  const { query } = useRouter()
  useEffect(() => {
    let fetch = true

    if (userLogged?.uid) {
      if (!research)
        getFlashArticles().then(arts => {
          dispatch(setDashboardResearchState(arts))
          setloading(false)
        })
    }

    return () => {
      fetch = false
    }
  }, [])

  async function getFlashArticles() {
    const bitcoin = await AnalysisRepositoryInstance.getArticles(
      userLogged?.userDataToken,
      userLogged?.wpToken,
      {
        category_name: 'bitcoin',
        posts_per_page: 1
      }
    )

    const altcoins = await AnalysisRepositoryInstance.getArticles(
      userLogged?.userDataToken,
      userLogged?.wpToken,
      {
        category_name: 'altcoins',
        posts_per_page: 1
      }
    )

    return [
      { cat: 'bitcoin', items: bitcoin },
      { cat: 'altcoins', items: altcoins }
    ]
  }
  return !research ? (
    <Loading loading />
  ) : (
    <>
      {research
        ?.reduce((current: any, prev: any) => [...current.items, ...prev.items])
        .map((item: Post, index: any) => {
          const parentCat = item.getCatgoryByParent('analysis')[0]
          return (
            <InfoTextCard
              chip={research[index].cat}
              isLocked={!item.metas.permission_garanted}
              key={index}
              href={{
                pathname: '/research/bitcoins-altcoins/' + research[index].cat + '/' + item.slug,
                query: { ...query, post_id: item.id, post_title: item.title.raw, cat: parentCat.term_id, category_name: research[index].cat }
              }}
              title={item.title.rendered}
              text={item.excerpt.rendered}
              imageHref={item.thumbnail_url}
              blockContent={false}
              alt=''
            />
          )
        })}
    </>
  )
}

//Función que renderiza las flash updates, hay que controlar que sean 2
const FlashUpdatesRender = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { fu } = useSelector(dashboardState)
  const userLogged = useSelector(getUserLogged)
  useEffect(() => {
    let fetch = true
    FlashUpdatesRepositoryInstance.getArticles(
      userLogged?.userDataToken,
      userLogged?.wpToken,
      {
        offset: 1,
        post_status: 'public',
        category_name: 'flash-updates',
        s: '',
        posts_per_page: 2
      }
    ).then(arts => {
      dispatch(setDashboardFUState(arts))
    })



    return () => {
      fetch = false
    }
  }, [])

  return !fu ? (
    <Loading loading />
  ) : (
    // <>
    //   {fu.map((item:any, index: any) => {
    //     return (
    //       <InfoTextCard
    //         key={index}
    //         title={item.title.raw}
    //         isLocked={!item.metas.permission_garanted}
    //         blockContent= {true}
    //         href={'/research/flash-updates'}
    //         text={parse(item.content?.rendered || '')}
    //         imageHref={item.image}
    //         alt=''
    //       />
    //     )
    //   })}
    // </>
    <InfoList list={[]} /> //@jose pasarle aqui el array de FU
  )
}

const RenderAma = () => {
  const { ama } = useSelector(dashboardState)
  const { push } = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    amasRepository.getChatRooms({ query: '', filters: { state: 'active' }, page: { size: 1, current: 1 } })
      .then((res: any) => {
        if (res.results[0]) {
          dispatch(setDashboardAmaState(res.results[0]))
        }

        return res;
      })
  }, [])

  const openChatroom = async (chatroom: Chatroom) => {

    if (chatroom.state === 'coming_soon') {
      await amasRepository.setChatroom({ id: chatroom.id, state: 'active' })
    }
    dispatch(cleanMessages())
    dispatch(setChatroom(chatroom))
    push(`/amas/${chatroom.id}`)
  }

  return (
    <>
      {
        ama ? <InfoColorCard
          alt={'Imagen de cursos'}
          backgroundColor='#F2E4FF'
          iconHref={amasIcon}
        >
          <div className={style.amasCardText}>
            <h2 className='small-caps'>
              <Link href={'#'}>Amas</Link>
            </h2>
            <h3>
              <div onClick={() => openChatroom(ama)}>
                {ama.title}
              </div>
            </h3>
          </div>
        </InfoColorCard> : <p>No hay amas disponibles</p>
      }
    </>
  )
}

const Dashboard: NextPage = () => {
  //@jose estas constantes se pueden borrar cuando te traigas la fecha del webinar, es de test
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'short' })
  //



  return (
    <div className={style.dashboard}>
      <div className={style.dashboard_grid}>
        <div
          className={`${style.dashboard_grid_item} ${style.item__span8} ${style.item__noBg}`}
        >
          <div className={style.advertising_container}>
            <AdvertisingList />
          </div>
        </div>
        <div
          className={`${style.dashboard_grid_item} ${style.item__span5} ${style.news}`}
        >
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='news' />
            </span>
          </div>
          <div className={style.item_content}>
            <NewsList />
          </div>
        </div>
        <div
          className={`${style.dashboard_grid_item} ${style.item__span3} ${style.webinars}`}
        >
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='page.dashboard.lastWebinars.text' />
            </span>
          </div>
          <div className={style.item_content}>
            <LastWebinarRender />
          </div>
        </div>
        <div
          className={`${style.dashboard_grid_item} ${style.item__span8} ${style.research}`}
        >
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='research' />
            </span>
          </div>
          <div className={style.item_content}>
            <div className={style.flexContainer}>
              <ResearchRender />
            </div>
          </div>
        </div>
        <div
          className={`${style.dashboard_grid_item} ${style.item__span5} ${style.flashUpdates}`}
        >
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='flash-updates' />
            </span>
          </div>
          <div className={style.item_content}>
            <div className={style.flexContainer}>
              <FlashUpdatesRender />
            </div>
          </div>
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span3}`}>
          <Link href={'/academy'}>
            <a>
              <InfoColorCard
                alt={'Imagen del logo de discord'}
                backgroundColor='#DBDEFF'
                iconHref={discordIcon}
              >
                <p className={style.colorCardText}>
                  <FormattedMessage
                    id='page.dashboard.discord.text'
                    values={{
                      b: children => <span>{children}</span>
                    }}
                  />
                </p>
              </InfoColorCard>
            </a>
          </Link>



        </div>
        <div
          className={`${style.dashboard_grid_item} ${style.item__span8} ${style.item__noBg}`}
        >
          <div className={style.flexContainer}>
            <Link href={'/tax-consultant'}>
              <a>
                <InfoColorCard
                  backgroundColor='#FDE6CC'
                  iconHref={consultandIcon}
                  alt={'Consultores'}
                >
                  <p className={style.colorCardText}>
                    <FormattedMessage
                      id='page.dashboard.taxConsultant.text'
                      values={{
                        b: children => <span>{children}</span>
                      }}
                    />
                  </p>
                </InfoColorCard>
              </a>
            </Link>
            
            <Link href={'/academy'}>
              <a>
                <InfoColorCard
                  alt={'Imagen de cursos'}
                  backgroundColor='#CEF7FB'
                  iconHref={coursesIcon}
                >
                  <p className={style.colorCardText}>
                    <FormattedMessage
                      id='page.dashboard.coursesTutorials.text'
                      values={{
                        b: children => <span>{children}</span>
                      }}
                    />
                  </p>
                </InfoColorCard>
              </a>
            </Link>
          </div>
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span4}`}>
          <RenderAma />
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span4}`}>
        <Link href={'/tax-consultant/resources'}>
              <a>
                <InfoColorCard
                  alt={'Imagen de una ilustración de recursos'}
                  backgroundColor='#D4E5FF'
                  iconHref={resourcesIcon}
                >
                  <p className={style.colorCardText}>
                    <FormattedMessage
                      id='page.dashboard.resources.text'
                      values={{
                        b: children => <span>{children}</span>
                      }}
                    />
                  </p>
                </InfoColorCard>
              </a>
            </Link>
        </div>
        {/* <div className={`${style.dashboard_grid_item} ${style.item__span3}`}>
          <Link href={'/academy'}>
            <a>
              <InfoColorCard
                alt={'Imagen del logo de discord'}
                backgroundColor='#DBDEFF'
                iconHref={discordIcon}
              >
                <p className={style.colorCardText}>
                  <FormattedMessage
                    id='page.dashboard.discord.text'
                    values={{
                      b: children => <span>{children}</span>
                    }}
                  />
                </p>
              </InfoColorCard>
            </a>
          </Link>
        </div> */}
        <div
          className={`${style.dashboard_grid_item} ${style.item__span8} ${style.values}`}
        >
          <div className={style.item_header}>
            <span>
              {/* <FormattedMessage id='valores' /> */}
              valores
            </span>
          </div>
          contenido de la api de valores
        </div>
      </div>
    </div>
  )
}

export default Dashboard
