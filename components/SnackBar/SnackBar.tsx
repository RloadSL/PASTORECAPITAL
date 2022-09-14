/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSystem } from 'ui/hooks/system.hooks'
import style from './SnackBar.module.scss'



interface SNACKBARPROPS {
  time?: number,
  type: 'warn' | 'error' | 'info' | 'success'
}

/**
 * Función de principal de SnackBar de la aplicación
 * @param time Tiempo que permanece visible el snackbar 
 * @returns 
 */

export const SnackBar = ({ time = 5000, type = 'info' }: SNACKBARPROPS) => {
  const {errorsApp, cleanErrorsApp} = useSystem()
  useEffect(() => {
    if (errorsApp.length > 0) setTimeout(() => {
      cleanErrorsApp();
    }, time);
  }, [errorsApp.length])

  return (
    <SnackBarView errorsApp={errorsApp} type={type}/>
  )
}

const SnackBarView = ({ errorsApp, type }: { errorsApp: ErrorApp[], type: 'warn' | 'error' | 'info' | 'success' }) => {
  return (
    <div className={`${style.snackBar} ${errorsApp.length > 0 ? style.show : ''}`}>
      {errorsApp.map((err, index:number) => <div key={index} className={`${style.container} ${style[type]}`}>
        <p ><FormattedMessage id={err.errorCode}></FormattedMessage></p>
      </div>)}
    </div>
  );
}
