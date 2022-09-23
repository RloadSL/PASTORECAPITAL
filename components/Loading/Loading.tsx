import React from 'react'
import { useSystem } from 'ui/hooks/system.hooks'
import style from './Loading.module.scss'

type LOADINGPROPS = 'inner-primary' | 'outer-primary' | 'inner-secondary' | 'outer-secondary'

export const Loading = ({ variant = 'inner-primary' , loading}: { variant?: LOADINGPROPS, loading?:boolean }) => {
  const { loadingState } = useSystem()
  return <LoadingView variant={variant} loadingState={loading || loadingState} />
}

/**
 * Función principal del componente Loading
 * @param loadingState Estado que muestra u oculta el cargador
 * @param variant variante del loading inner | outer , primary | secondary
 * @returns 
 */

const LoadingView = ({ loadingState, variant }: { loadingState: boolean, variant: LOADINGPROPS }) => {
  console.log(loadingState)
  return loadingState ? <div className={`${style.loading} ${style[variant]}`}><div className={style.loadingContainer}></div></div> : null;
}