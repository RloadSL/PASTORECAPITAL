/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import { InfoApp } from 'domain/InfoApp/InfoApp'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSystem } from 'ui/hooks/system.hooks'
import style from './SnackBar.module.scss'

// const errorTEst = [new ErrorApp({errorCode: 'auth/wrong-password', errorMessage: 'auth/wrong-password'}, 'warning')]

interface SNACKBARPROPS {
  time?: number
}

/**
 * Función de principal de SnackBar de la aplicación
 * @param time Tiempo que permanece visible el snackbar
 * @returns
 */

export const SnackBar = ({ time = 5000 }: SNACKBARPROPS) => {
  const { errorsApp, cleanMessagesApp, messages } = useSystem()

  useEffect(() => {
    if (errorsApp.length > 0 || messages.length > 0)
      setTimeout(() => {
        cleanMessagesApp()
      }, time)
  }, [errorsApp.length, messages.length])

  return <SnackBarView messages={[...errorsApp, ...messages]} />
}

const SnackBarView = ({
  messages
}: {
  messages: Array<InfoApp | ErrorApp>
}) => {
  return (
    <div
      className={`${style.snackBar} ${messages.length > 0 ? style.show : ''}`}
    >
      {messages.map((m: any, index: number) => {
        const code = m instanceof ErrorApp ? m.errorCode : m.code;
        return (
          <div key={index} className={`${style.container} ${style[m.type]}`}>
            <p>
              <FormattedMessage id={m.errorCode}></FormattedMessage>
            </p>
          </div>
        )
      })
    }
    </div>
  )
}
