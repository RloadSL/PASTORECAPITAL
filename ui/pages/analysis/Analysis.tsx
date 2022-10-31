import ButtonApp from 'components/ButtonApp';
import LinkApp from 'components/LinkApp';
import { NextPage } from 'next'
import React, { useState } from 'react'
import style from "./Analysis.module.scss";
import iconDelete from '../../../assets/img/icons/trash.svg'
import iconEdit from '../../../assets/img/icons/pencil.svg'
import addArticleIcon from '../../../assets/img/icons/add-document.svg'
import WordpressHeader from 'WordpressHeader'
import { FormattedMessage } from 'react-intl';
import Image from 'next/image'
import ArticleFilters from './components/ArticleFilters';
import ArticlesGrid from 'components/ArticlesGrid';
import WPCategory from 'components/WPCategory';
import { WPterms } from '../../utils/test.data'
import useWindowSize from 'ui/hooks/windowSize.hook';
import SubscriptionBanner from 'components/SubscriptionBanner';
import bannerImage from '../../../assets/img/banner.png'


const Analysis: NextPage<any> = () => {

  return (
    <AnalysisView></AnalysisView>
  )
}

const AnalysisView = () => {
  // const editLink = (token?: string) => {
  //   return token
  //     ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`
  //     : undefined
  // }
  const [deletePost, setDeletePost]: [{ id: number, status: string } | null, Function] = useState(null)

  //El contenido del banner lo monto desde el padre para que sea totalmente configurable ya que no se qué mostraré en cada banner
  const BannerContentColLeft = () => {
    return (
      <div className={style.bannerColLeft}>
        <p className={style.subtitle}>Upgrade to <strong>Pastore Capital</strong></p>
        <p className={style.title}>Unlock <strong>Everything</strong></p>
      </div>
    )
  }

  const BannerContentColRight = () => {
    return (
      <div className={style.bannerColRight}>
        <ul className={style.list}>
          <li>Exclusive long-form daily research</li>
          <li>Daily crypto news and insights in your inbox</li>
          <li>CSV data exports</li>
        </ul>
      </div>
    )
  }

  return (
    <div className={style.analysisPage}>
      <header>
        <p className={`main-title`}><FormattedMessage id='Análisis' /></p>
      </header>
      {/* <WPCategory articlesPosition={'flex'} category={WPterm}/> */}
      <ArticleFilters />
      <SubscriptionBanner
        linkHref={'#'}
        colLeftContent={BannerContentColLeft()}
        colRightContent={BannerContentColRight()}
        backgroundColor={'#DADDE5'}
      />

      <SubscriptionBanner
        linkHref={'#'}
        image={bannerImage}
        colLeftContent={BannerContentColLeft()}
        colRightContent={
          <div className={style.fakeButton}>Learn More</div>
        }
        backgroundColor={'#DADDE5'}
      />

      {WPterms.map((WPterm) => {
        return <WPCategory key={WPterm.term_id.toString()} componentStyle={'grid'} category={WPterm} />
      })}
      <div className={style.addNewArticle}>
        <ButtonApp
          onClick={() => console.log('crear')}
          labelID='Añadir nuevo artículo'
          buttonStyle='primary'
          icon={addArticleIcon}
        />
      </div>
    </div>
  )
}

export default Analysis