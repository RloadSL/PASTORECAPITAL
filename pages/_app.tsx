import '../styles/globals.css'
import { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import en from '../lang/en.json'
import es from '../lang/es.json'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from '../ui/redux/store'

const messages:any = {
  en,
  es
}

function getDirection(locale:string) {
  if (locale === "es") {
    return "rtl";
  }
  return "ltr";
}

function PastoreCapital ({ Component, pageProps }: AppProps) {
  const locale:any = useRouter().locale || 'es';
  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Component {...pageProps} dir={getDirection(locale)} />
      </IntlProvider>
    </Provider>
  )
}

export default PastoreCapital
