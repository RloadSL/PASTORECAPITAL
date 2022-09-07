/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import { useSystem } from 'ui/hooks/system.hooks'

export const ErrorAlert = ({time = 5000}:{time?: number}) => {
  const {errorsApp} = useSystem()
 
  
  return (
    <ErrorAlertView errorApp={errorsApp}/>
  )
}

const ErrorAlertView = ({errorApp}:{errorApp: ErrorApp[]}) => {
  return  <>{errorApp.map((err, index) => <p key={index}>ERROR DEL SISTEMA</p>)}</>;
}
