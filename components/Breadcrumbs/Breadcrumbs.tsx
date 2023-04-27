/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import style from './Breadcrumbs.module.scss'

/**
 * Función principal del componente breadcrumbs
 * @returns 
 */

const Breadcrumbs = () => {
  const router = useRouter()
  const [crumbs, setCrumbs] = useState<any[]>([])
  const constructUrl = (item: any) => {
    const befurl = router.route.split('/')
    let newArr = befurl.splice(1, befurl.indexOf(item))
    return newArr.join('/')
  }

  useEffect(() => {
    addCrumb()
  }, [])

  
  
  
  const addCrumb = useCallback(() => {

    if(router.route === '/') return [
      {
        labelId: '',
        url: `/`
      }
    ]

    

    for (let crumb of router.route.split('/')) {
      console.log(crumb)
      let obj = {
        labelId: crumb,
        url: {
          pathname: `/${constructUrl(crumb)}`, 
          query: router.query
        }
      }

     
      setCrumbs((pre) => {
        if(pre.find(item => item.labelId === obj.labelId)){
          return pre;
        }
        else{
          return [...pre, obj]
        }
      })
    }
  }, [])

  const dynamic_titles = {
    'course-slug': router.query.post_title,
    'lesson-slug': router.query.lesson_title,
    'tutorial-slug' : router.query.post_title,
    'category-slug' : router.query.category_name,
    'article-slug' : router.query.post_title
  }

  return <BreadcrumbsView crumbs={crumbs} title={dynamic_titles}/>
}

const BreadcrumbsView = ({crumbs, title}: {crumbs: Array<{labelId:string, url: string}>, title?:any}) =>{
  const {replace} = useRouter()
  
  
  const renderLabel  = (labelId:string) => {
    labelId = labelId.replace('[', '').replace(']', '');
    if(title[labelId]){
      return title[labelId];
    }else{
      return (<FormattedMessage
        id={labelId === '' ? 'home' : labelId}
      />)
    }
  }
  
  return (
    <div className={style.breadcrumbsContainer}>
      {crumbs.map((item: any, index: any) => {
        return (
          crumbs.length !== index+1 ? <div
            onClick={()=>replace(item.url.pathname, undefined , {shallow: false})}
            key={index.toString()}
          >
            <a className={style.crumbLink}>
           { renderLabel(item.labelId )}
            </a>
          </div> : <span key={index.toString()} className={style.crumbLink}>
          { renderLabel(item.labelId )}
          </span>
        )
      })}
    </div>
  )
}

export default React.memo(Breadcrumbs)
