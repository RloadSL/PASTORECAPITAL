import '../styles/globals.css'
import { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import en from '../lang/en.json'
import es from '../lang/es.json'
import { useRouter } from 'next/router'

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
function MyApp ({ Component, pageProps }: AppProps) {

  const locale:any = useRouter().locale || 'es';
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} dir={getDirection(locale)} />
    </IntlProvider>
  )
}

export default MyApp
