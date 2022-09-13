import React from 'react'
import { useSystem } from 'ui/hooks/system.hooks'
import style from './Loading.module.scss'

export const Loading = () => {
  const {loadingState} = useSystem()
  return <LoadingView loadingState={loadingState}/>
}

const LoadingView = ({loadingState}:{loadingState:boolean}) => {
  return loadingState ? <div className={style.loading}><div className={style.loadingContainer}>Loading...</div></div> : null;
}