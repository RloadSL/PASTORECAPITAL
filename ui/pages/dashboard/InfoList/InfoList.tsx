import ItemList from 'components/ItemList'
import Link from 'next/link'
import React from 'react'
import style from './info-list.module.scss'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import { News } from 'domain/News/News'

interface InfoListProps {
  list: any
}

/**
 * Componente que renderiza el bloque de listados en el dashboard
 * @param list Array de elementos que se va a listar
 * @returns 
 */

const InfoList = ({list}: InfoListProps) => {
  const { limitTextLength } = useComponentUtils()
  return (
    <>
      <ItemList
        items={list.map((item:any) => {
          
          return (
            <div className={style.news_item} key={item.news_url + Math.random()}>
              <Link href={item.news_url} target='_blank'>
                <a>
                  <h3 className={style.news_item__title}>
                    {limitTextLength(90, item.title)}
                  </h3>
                  <p className={style.news_item__footer}>
                    {item.source_name}{' '}
                    <span>{item.date.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
                  </p>
                </a>
              </Link>
            </div>
          )
        })}
      />
    </>
  )
}

export default InfoList