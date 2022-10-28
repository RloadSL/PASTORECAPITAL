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
import {WPterms} from '../../utils/test.data'
import useWindowSize from 'ui/hooks/windowSize.hook';


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



  return (
    <div className={style.analysisPage}>
      {/* <WPCategory articlesPosition={'flex'} category={WPterm}/> */}
      <ArticleFilters />
      {WPterms.map((WPterm) => {
        return <WPCategory key={WPterm.term_id.toString()} componentStyle={'grid'} category={WPterm}/>
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