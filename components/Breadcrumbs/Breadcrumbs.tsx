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
        url: `/${constructUrl(crumb)}`
      }
      crumbs = [...crumbs, obj]
    }
    
    return crumbs
  }, [])


  
  return <BreadcrumbsView crumbs={addCrumb()} title={router.query.courseTitle}/>
}

const BreadcrumbsView = ({crumbs, title}: {crumbs: Array<{labelId:string, url: string}>, title?:any}) =>{
  const dynamicRoutes = ['[slug]' , '[lesson]']
  const renderLabel  = (labelId:string) => {
    if(!dynamicRoutes.includes(labelId)){
      return (<FormattedMessage
                id={labelId === '' ? 'home' : labelId}
              />)
    }else{
      return title;
    }
  }
  
  return (
    <div>
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
