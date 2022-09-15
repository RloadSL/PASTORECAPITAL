import React from 'react'
import { useSelector } from 'react-redux'
import { useSystem } from 'ui/hooks/system.hooks'
import { isLoading } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './Loading.module.scss'

type LOADINGPROPS = 'inner-primary' | 'outer-primary' | 'inner-secondary' | 'outer-secondary'

export const SplashScreen = ({ variant = 'inner-primary' }: { variant?: LOADINGPROPS }) => {
  const authLoading = useSelector(isLoading)
  return <SplashScreenView variant={variant} loadingState={authLoading} />
}

/**
 * Función principal del componente SplashScreen
 * @param loadingState Estado que muestra u oculta el cargador
 * @param variant variante del loading inner | outer , primary | secondary
 * @returns 
 */

const SplashScreenView = ({ loadingState, variant }: { loadingState: boolean, variant: LOADINGPROPS }) => {
  return loadingState ? <div className={`${style.loading} ${style[variant]}`}><div className={style.loadingContainer}></div></div> : null;
}