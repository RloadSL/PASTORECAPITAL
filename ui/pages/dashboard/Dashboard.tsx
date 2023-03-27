
import { NextPage } from 'next'
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
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
export const NewsList = () => {
  const { limitTextLength } = useComponentUtils()
  const [news, setnews] = useState<News[] | undefined>()
  useEffect(() => {
    let fetch = true

    newsRepository
      .getNews({ search: '', tickers: 'AllTickers', items: 3 })
      .then(result => {
        setnews(result.data)
      })
    return () => {
      fetch = false
    }
  }, [])

  return !news ? (
    <Loading loading variant='inner-primary' />
  ) : (
    <>
      <ItemList
        items={news.map((singleNew: News) => {
          return (
            <div className={style.news_item} key={singleNew.news_url}>
              <Link href={singleNew.news_url} target='_blank'>
                <a>
                  <h3 className={style.news_item__title}>
                    {limitTextLength(90, singleNew.title)}
                  </h3>
                  <p className={style.news_item__footer}>
                    {singleNew.source_name}{' '}
                    <span>{singleNew.date.toLocaleString()}</span>
                  </p>
                </a>
              </Link>
            </div>
          )
        })}
      />
    </>
  )
}

//Función que renderiza el último webinar, sustituir datos estáticos por reales
const LastWebinarRender = () => {
  const [lastWebinar, setLastWebinar] = useState<Webinars | undefined>()
  useEffect(() => {
    let fetch = true

    const toDay = new Date()
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
        const {results} = res;
        if(results[0])
          setLastWebinar(results[0])
      })
    return () => {
      fetch = false
    }
  }, [])
  
  return !lastWebinar ? <p>Sin proximos webinars</p> : (
    <div className={style.lastWebinar}>
      <div className={style.top}>
        <div className={style.lastWebinar_date}>
          <span className={style.lastWebinar_date__day}>{lastWebinar?.date.getDate()}</span>
          <span className={style.lastWebinar_date__month}>{months[lastWebinar?.date.getMonth() as number]}</span>
        </div>
        <div className={style.lastWebinar_info}>
          <h3>
            {lastWebinar?.title}
          </h3>
          <p className={style.lastWebinar_info__author}>{lastWebinar?.guests}</p>
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

const Dashboard: NextPage = () => {
  //@jose estas constantes se pueden borrar cuando te traigas la fecha del webinar, es de test
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'short' })
  //

  //Función que renderiza las flash updates, hay que controlar que sean 2
  const flashUpdatesRender = () => {
    return dashboardFlashUpdates.map((item, index: any) => {
      return (
        <InfoTextCard
          key={index}
          title={item.title}
          text={item.text}
          imageHref={item.image.src}
          alt=''
        />
      )
    })
  }

  //Función que renderiza el contenido de research, debe pintar una noticia de bitcoins y otra de altcoins
  const researchRender = () => {
    return dashboardFlashUpdates.map((item, index: any) => {
      return (
        <InfoTextCard
          chip={'bitcoin'}
          key={index}
          title={item.title}
          text={item.text}
          imageHref={item.image.src}
          alt=''
        />
      )
    })
  }

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
            <div className={style.flexContainer}>{researchRender()}</div>
          </div>
        </div>
        <div
          className={`${style.dashboard_grid_item} ${style.item__span8} ${style.flashUpdates}`}
        >
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='flash-updates' />
            </span>
          </div>
          <div className={style.item_content}>
            <div className={style.flexContainer}>{flashUpdatesRender()}</div>
          </div>
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
                  alt={'Imagen de un muñeco a modo de consultor'}
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
        <div className={`${style.dashboard_grid_item} ${style.item__span5}`}>
          <InfoColorCard
            alt={'Imagen de cursos'}
            backgroundColor='#F2E4FF'
            iconHref={amasIcon}
          >
            <div className={style.amasCardText}>
              <h2 className='small-caps'>
                <Link href={'#'}>Amas</Link>
              </h2>
              <h3>
                <Link href={'#'}>
                  Título del Ama un poco largo para ver cuanto da de longitud
                </Link>
              </h3>
            </div>
          </InfoColorCard>
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
