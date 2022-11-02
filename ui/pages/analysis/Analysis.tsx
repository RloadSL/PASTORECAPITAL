import ButtonApp from 'components/ButtonApp'

import { NextPage } from 'next'
import React, { Suspense, useEffect, useState } from 'react'
import style from './Analysis.module.scss'

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

import ArticleFilters from './components/ArticleFilters'

import WPCategory from 'components/WPCategory'
import { WPterms } from '../../utils/test.data'
import CreateFormArticle from './components/CreateFormArticle'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

const Analysis: NextPage<any> = () => {
  const userLogged = useSelector(getUserLogged);
  useEffect(() => {
    let fetching = true
    
   // AnalysisRepositoryInstance.getArticle(userLogged.)
    return () => {fetching = false}
  }, [])
  
  return <AnalysisView></AnalysisView>
}

const AnalysisView = () => {
  // const editLink = (token?: string) => {
  //   return token
  //     ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`
  //     : undefined
  // }
  const [create, setCreate] = useState(false)

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
          onClick={() => setCreate(!create)}
          labelID='Añadir nuevo artículo'
          buttonStyle='primary'
          icon={addArticleIcon}
        />
        {create && (
          <Suspense>
            <CreateFormArticle
              onClose={() => {
                setCreate(false)
              }}
            ></CreateFormArticle>
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default Analysis
