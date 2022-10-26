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
import CategoryGrid from 'components/CategoryGrid';

const fakePosts = [
  {    id: 'sdsdf',
    categories: ['cat1','cat2','cat3'],
    status: 'publish',
    excerpt: 'kdfjhskdhgksdhgksdhg',
    slug: 'this._slug',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '21-enero-2022',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    thumbnail_url: 'this._thumbnail_url',
    tags: ['tag1','tag2','tag3'],
  },
  {    id: 'sdsdf',
  categories: ['cat1','cat2','cat3'],
  status: 'publish',
  excerpt: 'kdfjhskdhgksdhgksdhg',
  slug: 'this._slug',
  title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  date: '21-enero-2022',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  thumbnail_url: 'this._thumbnail_url',
  tags: ['tag1','tag2','tag3'],
},  {    id: 'sdsdf',
categories: ['cat1','cat2','cat3'],
status: 'publish',
excerpt: 'kdfjhskdhgksdhgksdhg',
slug: 'this._slug',
title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
date: '21-enero-2022',
content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
thumbnail_url: 'this._thumbnail_url',
tags: ['tag1','tag2','tag3'],
},  {    id: 'sdsdf',
categories: ['cat1','cat2','cat3'],
status: 'publish',
excerpt: 'kdfjhskdhgksdhgksdhg',
slug: 'this._slug',
title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
date: '21-enero-2022',
content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
thumbnail_url: 'this._thumbnail_url',
tags: ['tag1','tag2','tag3'],
}, 
]


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
      <ArticleFilters />
      <CategoryGrid posts={fakePosts} componentStyle={'grid'}/>
      <CategoryGrid posts={fakePosts} componentStyle={'flex'}/>

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