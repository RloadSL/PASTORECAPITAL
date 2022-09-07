/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import style from './SnackBar.module.scss'

interface SNACKBARPROPS {
  time?: number
}

/**
 * Función de principal de SnackBar de la aplicación
 * @param time Tiempo que permanece visible el snackbar 
 * @returns 
 */

export const SnackBar = ({ time = 5000 }: SNACKBARPROPS) => {
  const { authError, cleanError } = useAuthentication()

  useEffect(() => {
    if (authError.length > 0) setTimeout(() => {
      cleanError();
    }, time);
  }, [authError.length])

  return (
    <SnackBarView errorApp={authError} />
  )
}

const SnackBarView = ({ errorApp }: { errorApp: ErrorApp[] }) => {
  return (
    <div className={`${style.snackBar} ${errorApp.length > 0 ? style.show : ''}`}>

      {errorApp.map((err, index) => <div key={index} className={style.container}>
        <p >ERRROR DE APPP</p>
      </div>)}

    </div>
  );
}
