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
  const locale: any = useRouter().locale || 'es'
  
  
  return (<>
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <AppLayout dir={getDirection(locale)}>
          <Component {...pageProps} dir={getDirection(locale)} />
        </AppLayout>
        <SnackBar></SnackBar>
        <Loading variant='outer-primary'/>
      </IntlProvider>
    </Provider>
  </>
    
  )
}

export default PastoreCapital
