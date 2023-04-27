/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import en from '../lang/en.json'
import es from '../lang/es.json'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from '../ui/redux/store'
import AppLayout from '../components/AppLayout'
import SnackBar from 'components/SnackBar'
import Loading from 'components/Loading'
import { useEffect, useState } from 'react'
import Translate from 'domain/Translate/Translate'
import accesibilityService from 'infrastructure/services/accesibility.service'
import CookieAdvicer from 'components/CookieAdvicer'
import { cookies_items } from 'components/CookieAdvicer/constant'


const messages: any = {
  en,
  es
}

function getDirection (locale: string) {
  if (locale === 'es') {
    return 'rtl'
  }
  return 'ltr'
}

function PastoreCapital ({ Component, pageProps }: AppProps) {
  const locale: 'es' | 'en' = (useRouter().locale || 'es') as any
  const [cookies_compliance, setCookies_compliance] = useState('accepted')

  useEffect(() => {
    Translate.currentLocal = locale;
    accesibilityService.getPermissions();
    const st_cookie =  localStorage.getItem('cookies_compliance')
    setCookies_compliance(st_cookie || 'declined')
  }, [])
  
  return (<>
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <AppLayout dir={getDirection(locale)}>
          <Component {...pageProps} dir={getDirection(locale)} />
        </AppLayout>
        <SnackBar></SnackBar>
        <div style={{zIndex: 100}}>
          <Loading variant='outer-primary'/>
        </div>
        
      </IntlProvider>
    </Provider>
   {(!cookies_compliance  || cookies_compliance === 'declined') && <CookieAdvicer cookies_items={cookies_items}/>}
  </>
    
  )
}

export default PastoreCapital
