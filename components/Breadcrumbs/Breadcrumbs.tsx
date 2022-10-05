import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import style from './Breadcrumbs.module.scss'

const Breadcrumbs = () => {
  const router = useRouter()
  const myRef = React.useRef();

  let crumbs: any = []
  let befurl: any = [];

  const constructUrl = (item:any) => {
    befurl = router.route.split('/');
    let newArr = befurl.splice(1,befurl.indexOf(item))
    return newArr.join('/');
  }

  const addCrumb = () => {
    for (let crumb of router.route.split('/')) {
      let obj = {
        labelId: crumb,
        url:`/${constructUrl(crumb)}`
      }
      crumbs = [...crumbs, obj]
    }
  }

  addCrumb();

  return (
    <div>
      {
        crumbs.map((item: any, index: any) => {
          return (
            <Link href={item.labelId !== '[slug]' ? item.url : '#'} key={index.toString()}>
              <a className={style.crumbLink}>
                <FormattedMessage id={item.labelId === '' ? 'home' : item.labelId} />
              </a>
            </Link>
          )
        })
      }
    </div>
  )
}

export default Breadcrumbs