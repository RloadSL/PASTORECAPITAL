/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'

export const ErrorAlert = ({time = 5000}:{time?: number}) => {
  const {authError, cleanError} = useAuthentication()

  useEffect(() => {
   if(authError.length > 0) setTimeout(() => {
    cleanError();
   }, time); 
  }, [authError.length])
  
  return (
    <ErrorAlertView errorApp={authError}/>
  )
}

const ErrorAlertView = ({errorApp}:{errorApp: ErrorApp[]}) => {
  return  <>{errorApp.map((err, index) => <p key={index}><FormattedMessage id={err.errorCode}></FormattedMessage></p>)}</>;
}
