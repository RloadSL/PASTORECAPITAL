/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import Link from 'next/link'
import React, { useCallback } from 'react'
import style from './Breadcrumbs.module.scss'

/**
 * Función principal del componente breadcrumbs
 * @returns 
 */

const Breadcrumbs = () => {
  const router = useRouter()

  const constructUrl = (item: any) => {
    const befurl = router.route.split('/')
    let newArr = befurl.splice(1, befurl.indexOf(item))
    return newArr.join('/')
  }

  const addCrumb = useCallback(() => {
    console.log(router.query)

    if(router.route === '/') return [
      {
        labelId: '',
        url: `/`
      }
    ]

    let crumbs: any = []
    for (let crumb of router.route.split('/')) {
      
      let obj = {
        labelId: crumb,
        url: {pathname: `/${constructUrl(crumb)}`, query: router.query}
      }
      crumbs = [...crumbs, obj]
    }
    
    return crumbs
  }, [])

  const dynamic_titles = {
    'course-slug': router.query.post_title,
    'lesson-slug': router.query.lesson_title,
    'tutorial-slug' : router.query.post_title
  }

  return <BreadcrumbsView crumbs={addCrumb()} title={dynamic_titles}/>
}

const BreadcrumbsView = ({crumbs, title}: {crumbs: Array<{labelId:string, url: string}>, title?:any}) =>{
  
  
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
          crumbs.length !== index+1 ? <Link
            href={item.url}
            key={index.toString()}
          >
            <a className={style.crumbLink}>
           { renderLabel(item.labelId )}
            </a>
          </Link> : <span key={index.toString()} className={style.crumbLink}>
          { renderLabel(item.labelId )}
          </span>
        )
      })}
    </div>
  )
}

export default React.memo(Breadcrumbs)
