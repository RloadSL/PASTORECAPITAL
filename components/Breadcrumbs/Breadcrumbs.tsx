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

  const constructAsPath = (item: any) => {
    const befurl = router.asPath.split('/')
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
      const pathname= `/${constructUrl(crumb)}`
      let asPath;
      let queryParams = {};

      if(crumb.indexOf('[') != -1 && crumb.indexOf(']')!= -1){
      let key = crumb.substring(1, crumb.length - 1);
       
       asPath = constructAsPath(router.query[key])
       delete router.query[key];
       queryParams = {...router.query}
      }else{
        asPath = pathname;
      } 
      
    
      let obj = {
        labelId: crumb,
        url: {
          pathname, asPath, 
          query: queryParams
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
        console.log(item)
        return (
          crumbs.length !== index+1 ? <Link
            /* onClick={()=>replace(item.url.pathname, undefined , {shallow: false})} */
            href={item.url}
            as={item.url.asPath}
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
