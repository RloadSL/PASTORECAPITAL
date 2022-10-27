import ButtonApp from 'components/ButtonApp'

import { NextPage } from 'next'
import React, { Suspense, useState } from 'react'
import style from './Analysis.module.scss'

import addArticleIcon from '../../../assets/img/icons/add-document.svg'

import ArticleFilters from './components/ArticleFilters'

import WPCategory from 'components/WPCategory'
import { WPterms } from '../../utils/test.data'
import CreateFormArticle from './components/CreateFormArticle'

const Analysis: NextPage<any> = () => {
  return <AnalysisView></AnalysisView>
}

const AnalysisView = () => {
  // const editLink = (token?: string) => {
  //   return token
  //     ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`
  //     : undefined
  // }
  const [create, setCreate] = useState(false)

  return (
    <div className={style.analysisPage}>
      {/* <WPCategory articlesPosition={'flex'} category={WPterm}/> */}
      <ArticleFilters />
      {WPterms.map(WPterm => {
        return (
          <WPCategory
            key={WPterm.term_id.toString()}
            componentStyle={'grid'}
            category={WPterm}
          />
        )
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
