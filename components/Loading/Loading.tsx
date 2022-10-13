import React from 'react'
import { useSystem } from 'ui/hooks/system.hooks'
import style from './Loading.module.scss'

type LOADINGPROPS = 'inner-primary' | 'outer-primary' | 'inner-secondary' | 'outer-secondary'

export const Loading = ({ variant = 'inner-primary' , loading, customBackdrop}: { variant?: LOADINGPROPS, customBackdrop?: string,loading?:boolean }) => {
  const { loadingState } = useSystem()
  return <LoadingView variant={variant} customBackdrop={customBackdrop} loadingState={loading || loadingState} />
}

/**
 * Función principal del componente Loading
 * @param loadingState Estado que muestra u oculta el cargador
 * @param variant variante del loading inner | outer , primary | secondary
 * @returns 
 */

const LoadingView = ({ loadingState, variant, customBackdrop }: { loadingState: boolean, customBackdrop?:string, variant: LOADINGPROPS }) => {
  return loadingState ? <div style={customBackdrop ? {backgroundColor: customBackdrop} : {}} className={`${style.loading} ${style[variant]}`}><div className={style.loadingContainer}></div></div> : null;
}