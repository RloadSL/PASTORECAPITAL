import Form from "components/FormApp";
import { NextPage } from "next";
import { FormattedMessage } from "react-intl";
import style from './dashboard.module.scss'
import InfoColorCard from "./InfoColorCard";
import consultandIcon from '../../../assets/img/consultant.png'
import resourcesIcon from '../../../assets/img/resources.png'
import coursesIcon from '../../../assets/img/our-courses.png'
import amasIcon from '../../../assets/img/recent-amas.png'
import discordIcon from '../../../assets/img/discord.png'
import Link from "next/link";
import InfoTextCard from "./InfoTextCard";
import { dashboardFlashUpdates } from "ui/utils/test.data";
import AdvertisingList from "./AdvertisingList";

const Dashboard: NextPage = () => {

  const flashUpdatesRender = () => {
    return (
      dashboardFlashUpdates.map((item, index: any) => {
        return (
          <InfoTextCard key={index} title={item.title} text={item.text} imageHref={item.image.src} alt='' />
        )
      })
    )
  }

  const researchRender = () => {
    return (
      dashboardFlashUpdates.map((item, index: any) => {
        return (
          <InfoTextCard chip={'bitcoin'} key={index} title={item.title} text={item.text} imageHref={item.image.src} alt='' />
        )
      })
    )
  }

  const lastWebinarRender = () => {
    return (
      <div className={style.lastWebinar}>
        <div className={style.top}>
          <div className={style.lastWebinar_date}>
            fecha
          </div>
          <div className={style.lastWebinar_info}>
            <h3>
              title
            </h3>
            <p>autor</p>
          </div>
        </div>
        <div className={style.bottom}>
          link
        </div>
      </div>
    )
  }

  return (
    <div className={style.dashboard}>
      <div className={style.dashboard_grid}>
        <div className={`${style.dashboard_grid_item} ${style.item__span8} ${style.item__noBg}`}>
          <div className={style.advertising_container}>
            <AdvertisingList />
          </div>
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span5} ${style.news}`}>
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='news' />
            </span>
          </div>
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span3} ${style.webinars}`}>
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='webinars' />
            </span>
          </div>
          <div className={style.item_content}>
            {lastWebinarRender()}
          </div>
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span8} ${style.research}`}>
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='research' />
            </span>
          </div>
          <div className={style.item_content}>
            <div className={style.flexContainer}>
              {researchRender()}
            </div>
          </div>
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span8} ${style.flashUpdates}`}>
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='flash-updates' />
            </span>
          </div>
          <div className={style.item_content}>
            <div className={style.flexContainer}>
              {flashUpdatesRender()}
            </div>
          </div>
        </div>
        <div className={`${style.dashboard_grid_item} ${style.item__span8} ${style.item__noBg}`}>
          <div className={style.flexContainer}>
            <Link href={'/tax-consultant'}>
              <a>
                <InfoColorCard backgroundColor="#FDE6CC" iconHref={consultandIcon} alt={'Imagen de un muñeco a modo de consultor'}>
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
                <InfoColorCard alt={'Imagen de una ilustración de recursos'} backgroundColor="#D4E5FF" iconHref={resourcesIcon}>
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
                <InfoColorCard alt={'Imagen de cursos'} backgroundColor="#CEF7FB" iconHref={coursesIcon}>
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
          <InfoColorCard alt={'Imagen de cursos'} backgroundColor="#F2E4FF" iconHref={amasIcon}>
            <div className={style.amasCardText}>
              <h2 className="small-caps">
                <Link href={'#'}>
                  Amas
                </Link>
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
              <InfoColorCard alt={'Imagen del logo de discord'} backgroundColor="#DBDEFF" iconHref={discordIcon}>
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
        <div className={`${style.dashboard_grid_item} ${style.item__span8} ${style.values}`}>
          <div className={style.item_header}>
            <span>
              <FormattedMessage id='valores' />
            </span>
          </div>
          contenido de la api de valores
        </div>
      </div>
    </div>
  )
}


export default Dashboard